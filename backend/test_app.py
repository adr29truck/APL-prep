import os
import tempfile
import json

import pytest

from app import app

from db.seed import seed

header = {'Authorization': ''}

@pytest.fixture
def client():
    app.config['TESTING'] = True
    seed()

    with app.test_client() as client:
      # with flaskr.app.app_context():
      #         flaskr.init_db()
      yield client

def test_login(client):
    """Can sign in."""
    rv = client.post('/api/login', data=json.dumps({'username': 'admin', 'password': 'admin'}) )
    assert b'access_token' in rv.data
    x = json.loads(rv.data)
    header['Authorization'] = x['access_token']
    assert header['Authorization'] is not None
