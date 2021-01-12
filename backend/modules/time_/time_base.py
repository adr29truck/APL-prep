import flask_sqlalchemy

db = flask_sqlalchemy.SQLAlchemy()

class TimeBase(db.Model):
    """ TimeBase handles logic related to times """
    __tablename__ = 'times'
    id            = db.Column(db.Integer(), db.Sequence('time_id_seq'), primary_key=True)
    name          = db.Column(db.String(50))
    activity_id   = db.Column('activity_id', db.Integer(), default=None)
    # activity      = relationship("Activity", foreign_keys='times.activity_id')
    user_id       = db.Column('user_id', db.Integer())

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        try:
            return {
                'id'         : self.id,
                #  'modified_at': dump_datetime(self.modified_at),
                # This is an example how to deal with Many2Many relations
                'name'  : self.name,
                'activity_id': self.activity_id,
                'user_id': self.user_id,
                'color': self.color
            }
        except:
            return {
                'id'         : self.id,
                #  'modified_at': dump_datetime(self.modified_at),
                # This is an example how to deal with Many2Many relations
                'name'  : self.name,
                'activity_id': self.activity_id,
                'user_id': self.user_id,
                'color': None
            }
    
    def __repr__(self):
        return "<Time(name='%s', activity_id='%s')>" % (self.name, self.activity_id)
