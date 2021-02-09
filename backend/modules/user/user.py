import flask_sqlalchemy
import hashlib
import os
from numpy.compat import unicode

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
    is_active = True
    is_anonymous = False

    def get_id(self):
        return unicode(self.id)

    def commit(self):
        User.query.filter_by(id=self.id).update(
            {
                "username": self.username,
                "name": self.name,
                "password": self.password,
                "salt": self.salt,
                "is_authenticated": self.is_authenticated,
            }
        )
        db.session.commit()

    @classmethod
    def lookup(cls, username):
        print(username, " USER MODULE")
        return cls.query.filter_by(username=username).one_or_none()

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
        return (
            "<User(name='%s', id='%s', username='%s', password='%a', salt='%s', is_authenticated='%s')>"
            % (
                self.name,
                self.id,
                self.username,
                self.password,
                self.salt,
                self.is_authenticated,
            )
        )
