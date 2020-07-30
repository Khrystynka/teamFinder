import os


class Config:
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    # SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    CLIENT_ID = "fd5b87fdae6c1bd4b44c"
    # CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
    CLIENT_SECRET = "2e0801969afef2c08aff9f5aa6661a52890064c5"
    SQLALCHEMY_DATABASE_URI = "sqlite:///data.db"
    SECRET_KEY = os.urandom(24)
