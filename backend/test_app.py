import os
import tempfile
import json

import pytest

from app import app

from db.seed import seed

COOKIE = ".eJwlzsENwzAIAMBd_O4DbMAmy0RgsNJv0ryq7t5KvQnuXfZ15nWU7XXe-Sj7M8pWAGoIjdErL6xdWYg9zA2bSTN11YoeYIYS2RWmhCpZxcF9kVCrTTnD6kpzXAQBRGI0RQlmD1zMTiM6rGQ3UXQ0G5NhgqKUX-S-8vxvsHy-Zu8ulw.YCKMGg.GJbOTrCuJ5zhgvuh0QVNfQg-X2w"


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        # with flaskr.app.app_context():
        #         flaskr.init_db()
        yield client


def test_login(client):
    """Can sign in."""
    rv = client.post(
        "/api/login", data=json.dumps({"username": "admin", "password": "admin"})
    )
    COOKIE = rv.headers.getlist("Set-Cookie")[0]

    assert "session=" in COOKIE
    assert b"id" in rv.data
    x = json.loads(rv.data)
    assert x["id"] is not None


def test_times_fetch(client):
    """Validates activity retrival"""
    client.set_cookie("localhost", "session", COOKIE)
    rv = client.get("/times/2021-01-02")
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


def test_activity_fetch(client):
    """Validates activity retrival"""
    client.set_cookie("localhost", "session", COOKIE)
    rv = client.get("/activities")
    x = json.loads(rv.data)
    assert x[0] == {"color": "lightgrey", "id": 1, "name": "Sleep", "user_id": 0}
    assert x[1] == {"color": "#2196f3", "id": 2, "name": "Work - Meeting", "user_id": 0}
    assert x[2] == {"color": "#03a9f4", "id": 3, "name": "Work - Coding", "user_id": 0}
    assert x[3] == {"color": "lightblue", "id": 4, "name": "Coding", "user_id": 0}
    assert x[6] == {
        "color": "peachpuff",
        "id": 7,
        "name": "Entertainment",
        "user_id": 0,
    }
    assert x[9] == {"color": "yellow", "id": 10, "name": "Socialization", "user_id": 0}
