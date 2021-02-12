from sqlalchemy.orm import sessionmaker
import sqlalchemy as db
from modules.activity.activity import Activity
from modules.user import User
import const

engine = db.create_engine(const.DB_CONNECTION_STRING, echo=True)
connection = engine.connect()
metadata = db.MetaData()
Session = sessionmaker(bind=engine)
session = Session()


def create_tables():
    print("Processing tables..")
    times = db.Table(
        "times",
        metadata,
        db.Column("id", db.Integer(), primary_key=True),
        db.Column("name", db.String(50), nullable=False),
        db.Column("activity_id", db.Integer(), default=None),
        db.Column("user_id", db.Integer()),
    )
    activities = db.Table(
        "activities",
        metadata,
        db.Column("id", db.Integer(), primary_key=True),
        db.Column("name", db.String(50), nullable=False),
        db.Column("user_id", db.Integer(), nullable=False),
        db.Column("color", db.String(50), nullable=False, default="green"),
    )
    users = db.Table(
        "users",
        metadata,
        db.Column("id", db.Integer(), primary_key=True),
        db.Column("name", db.String(50), nullable=False),
        db.Column("username", db.String(50), nullable=False, unique=True),
        db.Column("password", db.Binary(), nullable=False),
        db.Column("salt", db.Binary(), nullable=False),
        db.Column("is_authenticated", db.Boolean(), nullable=False, default=False),
    )

    metadata.create_all(engine)
    print("Created tables")


def populate_tables():
    print("Populating the Activities table..")
    new_activity = Activity(name="Sleep", user_id=0, color="lightgrey")
    session.add(new_activity)
    new_activity = Activity(name="Work - Meeting", user_id=0, color="#2196f3")
    session.add(new_activity)
    new_activity = Activity(name="Work - Coding", user_id=0, color="#03a9f4")
    session.add(new_activity)
    new_activity = Activity(name="Coding", user_id=0, color="lightblue")
    session.add(new_activity)
    new_activity = Activity(name="Exercise", user_id=0, color="red")
    session.add(new_activity)
    new_activity = Activity(name="Transport", user_id=0, color="green")
    session.add(new_activity)
    new_activity = Activity(name="Entertainment", user_id=0, color="peachpuff")
    session.add(new_activity)
    new_activity = Activity(name="Internet", user_id=0, color="silver")
    session.add(new_activity)
    new_activity = Activity(name="Downtime", user_id=0, color="grey")
    session.add(new_activity)
    new_activity = Activity(name="Socialization", user_id=0, color="yellow")
    session.add(new_activity)
    session.commit()

    password, salt = User.hash_password("admin")
    new_user = User(
        name="Admin",
        username="admin",
        password=password,
        salt=salt,
        is_authenticated=False,
    )
    session.add(new_user)
    session.commit()
    print("Done populating")


def seed():
    create_tables()
    populate_tables()


if __name__ == "__main__":
    seed()
