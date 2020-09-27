import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    CLIENT_ID = "fd5b87fdae6c1bd4b44c"
    CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
    SECRET_KEY = os.urandom(24)
