from requests_oauthlib import OAuth2Session
from flask import Flask, request, redirect, session, url_for, render_template
from flask.json import jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from author import Author
import json
import requests

import os

app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///data.db"
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(100), unique=True, nullable=False)
    token = db.Column(db.String(100), unique=True, nullable=False)
    # auth_state = db.Column(db.String(100))

# This information is obtained upon registration of a new GitHub OAuth
# application here: https://github.com/settings/applications/new


authorization_base_url = 'https://github.com/login/oauth/authorize'
token_url = 'https://github.com/login/oauth/access_token'
check_token = 'https://api.github.com/user'
HEADERS = {'ACCEPT': 'application/vnd.github.cloak-preview'}

UI_url = "http://127.0.0.1:3000"
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
            # print('try token', json.loads(try_token.text)["login"])
    resp = jsonify({'auth_user': auth_user, 'isAuth': isAuth})
    # resp.headers['Access-Control-Allow-Origin'] = "*"
    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = "http://127.0.0.1:3000"

    return resp


@app.route("/login")
def login():
    print('flask login')
    """Step 1: User Authorization.

    Redirect the user/resource owner to the OAuth provider (i.e. Github)
    using an URL with a few key OAuth parameters.
    """
    # prime_user = User.query.filter_by(user=user_login).first()

    # if prime_user:
    #     return 'Success.You are already logged in'
    github = OAuth2Session(app.config['CLIENT_ID'])
    authorization_url, state = github.authorization_url(
        authorization_base_url)

    # # State is used to prevent CSRF, keep this for later.
    session['oauth_state'] = state
    print('auth url', authorization_url)
    return redirect(authorization_url)


# Step 2: User authorization, this happens on the provider.

@app.route("/nextpage", methods=["GET"])
def callback():
    """ Step 3: Retrieving an access token.

    The user has been redirected back from the provider to your registered
    callback URL. With this redirection comes an authorization code included
    in the redirect URL. We will use that to obtain an access token.
    """
    github = OAuth2Session(
        app.config['CLIENT_ID'], state=session['oauth_state'])
    token = github.fetch_token(token_url, client_secret=app.config['CLIENT_SECRET'],
                               authorization_response=request.url)

    session['oauth_token'] = token
    return redirect(UI_url)


# @app.route("/profile", methods=["GET"])
# def profile():
#     """Fetching a protected resource using an OAuth 2 token.
#     """
#     print('SESSION', session)
#     # result = github.get('https://api.github.com/users/'+search_login)
#     print(result.headers)
#     return jsonify(result.json())
@app.route("/logout")
def logout():
    print('Cookie', request.cookies)
    # session.pop('oauth_state')
    # session.pop('oauth_token')
    session.clear()
    print('clean_session', session)
    # return redirect(UI_url)
    resp = jsonify({'deleted': 1})
    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = "http://127.0.0.1:3000"

    # resp.delete_cookie

    return resp


@app.route("/get_team/<user>", methods=["GET"])
def get_team(user):
    print('Cookies', request.cookies)
    print('Session', session)
    """Fetching a protected resource using an OAuth 2 token.
    """
    # if 'oauth_token' not in session.keys():
    #     return 'Login first'
    # prime_user = User.query.filter_by(user=user_login).first()
    # if prime_user:
    #     access_token = json.loads(prime_user.token)
    #     print('token', access_token)
    if 'oauth_token' not in session.keys():
        return 'Login first'
    print(session)
    github = OAuth2Session(
        app.config['CLIENT_ID'], token=session['oauth_token'])
    author = Author(github, user)
    if not author:
        return 'User login is not valid'
    team_comments = author.get_team_by_pullrequests()
    team_close_commits = author.get_team_by_close_commits()
    team_followers = author.get_followers()
    team_following = author.get_following()
    team = combineTeams(team_followers, team_following,
                        team_close_commits, team_comments, user)
    # return jsonify({'team': team})
    # resp = jsonify({'team': team, 'comments': team_comments,
    #                 'commits': team_close_commits})
    resp = jsonify({'team': team})

    print("resp", resp.data)
    # resp.headers['Access-Control-Allow-Origin'] = "*"
    resp.headers['Access-Control-Allow-Credentials'] = "true"
    resp.headers['Access-Control-Allow-Origin'] = "http://127.0.0.1:3000"

    return resp


if __name__ == "__main__":
    # This allows us to use a plain HTTP callback
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = "1"
    app.secret_key = app.config['SECRET_KEY']

    app.run(debug=True)
