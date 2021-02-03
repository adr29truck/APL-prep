import flask_sqlalchemy
import hashlib
import os

db = flask_sqlalchemy.SQLAlchemy()


class User(db.Model):
    """ A User and associated logic """

    __tablename__ = "users"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.Binary(255))
    salt = db.Column(db.Binary())
    is_authenticated = db.Column(db.Boolean())

    # Flask_praetorian methods
    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.quer.get(id)

    @property
    def identity(self):
        return self.id

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            # 'modified_at': dump_datetime(self.modified_at),
            # This is an example how to deal with Many2Many relations
            "name": self.name,
            "username": self.username,
            # 'password': self.password,
        }

    @staticmethod
    def hash_password(password):
        salt = os.urandom(32)
        return (
            hashlib.pbkdf2_hmac(
                "sha256",  # The hash digest algorithm for HMAC
                password.encode("utf-8"),  # Convert the password to bytes
                salt,  # Provide the salt
                100_000,  # It is recommended to use at least 100,000 iterations of SHA-256
            ),
            salt,
        )

    def authenticate(self, password):
        new_key = hashlib.pbkdf2_hmac(
            "sha256", password.encode("utf-8"), self.salt, 100_000
        )
        return True if new_key == self.password else False

    def __repr__(self):
        return "<User(name='%s', id='%s', username='%s', password='%a', salt='%s', is_authenticated='%s')>" % (
            self.name,
            self.id,
            self.username,
            self.password,
            self.salt,
            self.is_authenticated
        )
