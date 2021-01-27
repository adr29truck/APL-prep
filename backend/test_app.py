import os
import tempfile
import json

import pytest

from app import app

from db.seed import seed

header = {"Authorization": ""}


@pytest.fixture
def client():
    app.config["TESTING"] = True
    seed()

    with app.test_client() as client:
        # with flaskr.app.app_context():
        #         flaskr.init_db()
        yield client


def test_login(client):
    """Can sign in."""
    rv = client.post(
        "/api/login", data=json.dumps({"username": "admin", "password": "admin"})
    )
    assert b"access_token" in rv.data
    x = json.loads(rv.data)
    header["Authorization"] = x["access_token"]
    assert header["Authorization"] is not None


def test_activity_fetch(client):
    """Validates activity retrival"""
    rv = client.get("/times/2021-01-02", headers=header)
    x = json.loads(rv.data)
    assert x[0] == {
        "activity_id": None,
        "color": None,
        "id": 1,
        "name": "2021-01-02T0",
        "user_id": 1,
    }
    assert x[12] == {
        "activity_id": None,
        "color": None,
        "id": 13,
        "name": "2021-01-02T12",
        "user_id": 1,
    }
    assert x[23] == {
        "activity_id": None,
        "color": None,
        "id": 24,
        "name": "2021-01-02T23",
        "user_id": 1,
    }
