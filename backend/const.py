import os

DB_CONNECTION_STRING = (
    f"postgresql+psycopg2://postgres:docker@{os.environ.get('host')}:5432/postgres"
)
