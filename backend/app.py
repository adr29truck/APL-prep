import flask
import flask_sqlalchemy
import flask_cors
from functools import wraps
from datetime import datetime
from flask_login import (
    LoginManager,
    login_user,
    logout_user,
    login_required,
    current_user,
)

# Our imports
from modules.time_ import TimeBase as Time
from modules.activity import Activity
from modules.user import User

# Import constants
import const

login_manager = LoginManager()

db = flask_sqlalchemy.SQLAlchemy()
cors = flask_cors.CORS()


# Initialize flask app for the example
app = flask.Flask(__name__)
app.debug = True
app.config["SECRET_KEY"] = "top secret"
app.config["JWT_ACCESS_LIFESPAN"] = {"hours": 24}
app.config["JWT_REFRESH_LIFESPAN"] = {"days": 30}
app.secret_key = (
    b"\xd1\xe6\xfd\xdf\xdfdnnw\x87\x1c\x98\xec\x87*E"  # FIXME: HIDE ME! TODO:
)

# Configure the PG database connection
app.config["SQLALCHEMY_DATABASE_URI"] = const.DB_CONNECTION_STRING
db.init_app(app)
# Initializes CORS so that the frontend can talk to the app
cors.init_app(app)
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    try:
        x = User.query.get(int(user_id))
        return x
    except:
        return None


@app.route("/")
def my_index():
    return flask.render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return flask.render_template("index.html")


# Set up some routes for the example
@app.route("/api/")
def home():
    return {"Hello"}, 200


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
            user.is_authenticated = True  # TODO: Change to true after email validated
            print(login_user(user))
            user.commit()
            return {"id": user.id}, 200
        else:
            return ("bad", 401)
    except:
        return ("bad", 401)


@app.route("/api/logout", methods=["POST"])
@login_required
def logout():
    """
    Logs a user out by handling a POST request
    .. example::
       $ curl http://localhost:5000/api/logout -X POST
    """
    try:
        print(logout_user())
        return "OK", 200
    except:
        return ("bad", 400)


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
        db.session.close()

        return flask.jsonify(new_user.serialize)
    except:
        return ("Bad", 400)


@app.route("/times/<time>", methods=["GET", "POST"])
@login_required
def times_user_date(time):
    user_id = current_user.id
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
            db.session.close()

            return flask.jsonify(temp.serialize)
        except:
            return ("Bad", 400)


@app.route("/activities", methods=["GET", "POST"])
@login_required
def activity():
    temp = flask.request.headers.get("Authorization")
    user_id = current_user.id
    if flask.request.method == "GET":
        return flask.jsonify(
            [
                t.serialize
                for t in Activity.query.filter(
                    Activity.user_id == user_id or Activity.user_id == 0
                )
                .order_by(Activity.id)
                .all()
            ]
        )
    elif flask.request.method == "POST":
        try:
            data = dict(flask.request.get_json())
            new_activity = Activity(name=data["name"], user_id=user_id)
            db.session.add(new_activity)
            db.session.commit()
            db.session.close()

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
    db.session.close()


# def dump_datetime(value):
#     """Deserialize datetime object into string form for JSON processing."""
#     if value is None:
#         return None
#     return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]
