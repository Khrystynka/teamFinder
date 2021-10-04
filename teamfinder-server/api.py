from requests_oauthlib import OAuth2Session
from flask import Flask, request, redirect, session, url_for, render_template
# from flask import *
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from author import Author
import json
import requests
import logging

logging.basicConfig(level=logging.DEBUG)


import os

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100), unique=True, nullable=False)
    token = db.Column(db.String(100), unique=True, nullable=False)


authorization_base_url = 'https://github.com/login/oauth/authorize'
token_url = 'https://github.com/login/oauth/access_token'
check_token = 'https://api.github.com/user'
HEADERS = {'ACCEPT': 'application/vnd.github.cloak-preview'}

URL = "https://find-github-team.herokuapp.com"
author = None


def combineTeams(team1, team2, team3, team4, user):
    for login in team4:
        if login in team3:
            team3[login] *= 2
        else:
            team3[login] = 2
    for login in team1:
        if login in team3:
            team3[login] *= 1.2
        else:
            team3[login] = 1
    for login in team2:
        if login in team3:
            team3[login] *= 1.2
        else:
            team3[login] = 1
    if user in team3:
        del(team3[user])
    team = list(map(lambda k: k[0], sorted(
        team3.items(), key=lambda x: x[1], reverse=True)))

    return (team)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/user")
def get_current_user():
    isAuth = None
    auth_user = None
    if ('oauth_token' in session.keys()):
        try_token = requests.get(
            check_token, headers={"Authorization": "token "+session['oauth_token']['access_token'], "Access-Control-Allow-Origin": '*'})
        if try_token.status_code == 200:
            isAuth = 1
            auth_user = json.loads(try_token.text)["login"]
    resp = jsonify({'auth_user': auth_user, 'isAuth': isAuth})
    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = URL

    return resp


@app.route("/login")
def login():
    github = OAuth2Session(app.config['CLIENT_ID'])
    authorization_url, state = github.authorization_url(
        authorization_base_url)
    # logging.debug(f"returned from GIT authorization: url: {authorization_url} and state {state}")
    # logging.debug(f'session before: {session}')
    
    session['oauth_state'] = state
    # logging.debug(f'session after: {session}')
    
    print('auth url', authorization_url)
    return redirect(authorization_url)


@app.route("/nextpage", methods=["GET"])
def callback():
    
    github = OAuth2Session(
        app.config['CLIENT_ID'], state=session['oauth_state'])
    token = github.fetch_token(token_url, client_secret=app.config['CLIENT_SECRET'],
                               authorization_response=request.url)

    session['oauth_token'] = token
    logging.debug(f"fetched token: {token}")
    return redirect(url_for("home"))


@app.route("/logout")
def logout():
    print('Cookie', request.cookies)
    session.clear()
    print('clean_session', session)
    resp = jsonify({'deleted': 1})
    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = URL
    return resp


@app.route("/get_team/<user>", methods=["GET"])
def get_team(user):
    logging.debug(f'In get_teams: Cookies: {request.cookies}')
    logging.debug(f'In get_t teams: session: {session}')

    if 'oauth_token' not in session.keys():
        return 'Login first'
    github = OAuth2Session(
        app.config['CLIENT_ID'], token=session['oauth_token'])
    author = Author(github, user)
    if not author:
        logging.debug( 'User login is not valid')
    team_comments = author.get_team_by_pullrequests()
    logging.debug(f'by comments: {team_comments}')

    team_close_commits = author.get_team_by_close_commits()
    logging.debug(f'by close commits: {team_close_commits}')

    team_followers = author.get_followers()
    logging.debug(f'by followers: {team_followers}')

    team_following = author.get_following()
    team = combineTeams(team_followers, team_following,
                        team_close_commits, team_comments, user)
    logging.debug(f'all teammates: {team}')

    resp = jsonify({'team': team})

    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = URL

    return resp


if __name__ == "__main__":
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"
    app.secret_key = app.config['SECRET_KEY']

    app.run(debug=True)
