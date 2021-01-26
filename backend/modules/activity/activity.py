import flask_sqlalchemy

db = flask_sqlalchemy.SQLAlchemy()


class Activity(db.Model):
    """ TimeBase handles logic related to Activities """

    __tablename__ = "activities"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50))
    user_id = db.Column(db.Integer())
    color = db.Column(db.String(50))

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            "id": self.id,
            # 'modified_at': dump_datetime(self.modified_at),
            # This is an example how to deal with Many2Many relations
            "name": self.name,
            "user_id": self.user_id,
            "color": self.color,
        }

    def __repr__(self):
        return "<Time(name='%s', id='%s', user_id='%s', color='%a')>" % (
            self.name,
            self.id,
            self.user_id,
            self.color,
        )
