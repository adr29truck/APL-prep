from flask import Flask
from flask import request
from flask.json import jsonify
from modules.time_ import TimeBase as Time
from modules.activity import Activity
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import sqlalchemy as db

engine     = db.create_engine('sqlite:///data.sqlite', echo=True, connect_args={'check_same_thread': False})
connection = engine.connect()
metadata   = db.MetaData()
Session    = sessionmaker(bind=engine)
session    = Session()
Base       = declarative_base()

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]



from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

if __name__ == '__main__':
    app.run(host='0.0.0.0')

@app.route('/times/<time>/<user_id>', methods = ['GET', 'POST'])
@cross_origin()
def times_user_date(time, user_id):
  s    = Session()
  if request.method == 'GET':
    activities = s.query(Activity).all()
    temp = s.query(Time).filter(Time.name.like(f'%{time}%'),Time.user_id == user_id).all()
    count = 0
    while len(temp) == 0:
      generate_times_in_db()
      temp = s.query(Time).filter(Time.name.like(f'%{time}%'),Time.user_id == user_id).all()
      count += 1
      if count > 3:
        raise "Loop error"
    for q in temp:
      try: 
        q.color = list(filter(lambda z: z.id == q.activity_id, activities))[0].color
      except:
        continue
    return jsonify([t.serialize for t in temp])
  elif request.method == 'POST':
    try:
      data = dict(request.get_json())
      temp = s.query(Time).filter(Time.id == data['id']).one()
      temp.activity_id = data['activity_id']
      s.commit()
      return jsonify(temp.serialize)
    except:
      return ('Bad', 400)

@app.route('/activities', methods = ['GET', 'POST'])
@cross_origin()
def  activity():
  s    = Session()
  if request.method == 'GET':
    return jsonify([t.serialize for t in s.query(Activity).all()])
  elif request.method == 'POST':
    try:
      data = dict(request.get_json())
      new_activity = Activity(name=data['name'], user_id=0)
      s.add(new_activity)
      s.commit()
      return jsonify(new_activity.serialize)
    except:
      return ('Bad', 400)




def generate_times_in_db():
  first_part = datetime.date.today().strftime('%Y-%m-%d')
  i = 0
  while i < 24:
    new_time = Time(name=(first_part + 'T' + str(i)), user_id=1)
    session.add(new_time)
    i += 1
  session.commit()

# generate_times_in_db()
