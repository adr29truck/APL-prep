from sqlalchemy.ext.declarative import declarative_base
import sqlalchemy as db
Base = declarative_base()

import hashlib
import os

class User(Base): 
  """ A User and associated logic """
  __tablename__ = 'users'
  id            = db.Column(db.Integer(), db.Sequence('time_id_seq'), primary_key=True)
  name          = db.Column(db.String(50))
  user_name     = db.Column(db.String(50))
  password      = db.Column(db.Binary(255))
  salt          = db.Column(db.Binary())

  @property
  def serialize(self):
    """Return object data in easily serializable format"""
    return {
        'id': self.id,
        # 'modified_at': dump_datetime(self.modified_at),
        # This is an example how to deal with Many2Many relations
        'name': self.name,
        'user_name': self.user_name,
        # 'password': self.password,
    }
  
  @staticmethod
  def hash_password(password):
    salt = os.urandom(32)
    return (hashlib.pbkdf2_hmac(
        'sha256', # The hash digest algorithm for HMAC
        password.encode('utf-8'), # Convert the password to bytes
        salt, # Provide the salt
        100_000 # It is recommended to use at least 100,000 iterations of SHA-256 
    ), salt)

  def check_password(self, password):
    new_key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        self.salt,
        100_000
    )
    return (True if new_key == self.password else False)

  def __repr__(self): 
    return "<Time(name='%s', id='%s', user_name='%s', password='%a', salt='%s')>" % (self.name, self.id, self.user_name, self.password, self.salt)
