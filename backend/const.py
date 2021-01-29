import os

if os.environ.get("ENV") != "production":
    DB_CONNECTION_STRING = (
        f"postgresql+psycopg2://postgres:docker@{os.environ.get('host')}:5432/postgres"
    )
else:
    DB_CONNECTION_STRING = f"postgresql+psycopg2://{os.environ.get('DATABASE_URL')}"
