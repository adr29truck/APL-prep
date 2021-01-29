import flask
import flask_sqlalchemy
import flask_praetorian
import flask_cors
from functools import wraps
from datetime import datetime

# Our imports
from modules.time_ import TimeBase as Time
from modules.activity import Activity
from modules.user import User

# Import constants
import const

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()


# Initialize flask app for the example
app = flask.Flask(__name__)
app.debug = True
app.config["SECRET_KEY"] = "top secret"
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}

# Initialize the flask-praetorian instance for the app
guard.init_app(app, User)
# Configure the PG database connection
app.config["SQLALCHEMY_DATABASE_URI"] = const.DB_CONNECTION_STRING
db.init_app(app)
# Initializes CORS so that the api_tool can talk to the example app
cors.init_app(app)


def require_authentication(method):
    """
    Verifies that the request has a valid authorization token
    othervise status 401 is returned.

    Args:
        method (function): The decorated function

    Returns:
        http Response: Http response provided by method if authorized else 401
    """

    @wraps(method)
    def authenticate(*args, **kwargs):
        temp = flask.request.headers.get("Authorization")
        # TODO: Check that the token has not expired
        # print(guard.extract_jwt_token(temp)['exp'])
        try:
            user_id = guard.extract_jwt_token(temp)["id"]
            print("USER ID: ", user_id)
            if user_id == None:
                flask.abort(401)
        except:
            flask.abort(401)
        finally:
            return method(*args, **kwargs)

    return authenticate


@app.route("/")
def my_index():
    return flask.render_template("index.html", flask_token="Hello   world")

# Set up some routes for the example
@app.route("/api/")
def home():
    return {"Hello": "World"}, 200


@app.route("/api/login", methods=["POST"])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/api/login -X POST \
         -d '{"username":"admin","password":"admin"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get("username", None)
    password = req.get("password", None)
    try:
        user = User.lookup(username)
        if user.authenticate(password):
            ret = {"access_token": guard.encode_jwt_token(user)}
            return ret, 200
        else:
            return ("bad", 401)
    except:
        return ("bad", 401)


@app.route("/api/refresh", methods=["POST"])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {"access_token": new_token}
    return ret, 200


@app.route("/api/register", methods=["POST"])
def register():
    data = dict(flask.request.get_json())
    try:
        password, salt = User.hash_password(data["password"])
        new_user = User(
            name=data["name"], username=data["username"], password=password, salt=salt
        )
        db.session.add(new_user)
        db.session.commit()
        return flask.jsonify(new_user.serialize)
    except:
        return ("Bad", 400)


@app.route("/api/protected")
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {
        "message": f"protected endpoint (allowed user {flask_praetorian.current_user().username})"
    }


@app.route("/times/<time>", methods=["GET", "POST"])
@require_authentication
def times_user_date(time):
    temp = flask.request.headers.get("Authorization")
    user_id = guard.extract_jwt_token(temp)["id"]
    if flask.request.method == "GET":
        activities = Activity.query.all()
        temp = (
            Time.query.filter(Time.name.like(f"%{time}%"), Time.user_id == user_id)
            .order_by(Time.id)
            .all()
        )
        count = 0
        while len(temp) == 0:
            generate_times_in_db(time)
            temp = Time.query.filter(
                Time.name.like(f"%{time}%"), Time.user_id == user_id
            ).all()
            count += 1
            if count > 3:
                raise "Loop error"
        for q in temp:
            try:
                q.color = list(filter(lambda z: z.id == q.activity_id, activities))[
                    0
                ].color
            except:
                continue
        return flask.jsonify([t.serialize for t in temp])
    elif flask.request.method == "POST":
        try:
            data = dict(flask.request.get_json())
            Time.query.filter(Time.id == data["id"]).update(
                dict(activity_id=data["activity_id"])
            )
            temp = Time.query.filter(Time.id == data["id"]).one()
            db.session.commit()

            return flask.jsonify(temp.serialize)
        except:
            return ("Bad", 400)


@app.route("/activities", methods=["GET", "POST"])
@require_authentication
def activity():
    temp = flask.request.headers.get("Authorization")
    user_id = guard.extract_jwt_token(temp)["id"]
    if flask.request.method == "GET":
        # TODO: Fetch all activities related to the signed-in user and from user 0
        return flask.jsonify(
            [t.serialize for t in Activity.query.order_by(Activity.id).all()]
        )
    elif flask.request.method == "POST":
        try:
            data = dict(flask.request.get_json())
            new_activity = Activity(name=data["name"], user_id=user_id)
            db.session.add(new_activity)
            db.session.commit()
            return flask.jsonify(new_activity.serialize)
        except:
            return ("Bad", 400)


# Run the application
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)


# Misc
def generate_times_in_db(date):
    """ Takes a date string and generates Time objects from it that it saves to the the db """
    date_time_obj = datetime.strptime(
        date, "%Y-%m-%d"
    )  # This is done to ensure a valid date is passed
    first_part = date_time_obj.strftime("%Y-%m-%d")
    i = 0
    while i < 24:
        new_time = Time(name=(first_part + "T" + str(i)), user_id=1)
        db.session.add(new_time)
        i += 1
    db.session.commit()


# def dump_datetime(value):
#     """Deserialize datetime object into string form for JSON processing."""
#     if value is None:
#         return None
#     return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]
