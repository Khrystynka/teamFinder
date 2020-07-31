__author__ = 'khrystyna'
from retry import retry
import requests
# from pycookiecheat import chrome_cookies
import json
import time
import datetime
from collections import defaultdict

HEADERS = {'ACCEPT': 'application/vnd.github.cloak-preview'}
DATE_FORMAT = "%Y-%m-%d"


def get_url(AouthSession, url, payload=None, headers=HEADERS):
    try:
        result = AouthSession.get(url, params=payload, headers=headers)
        parsed_result = json.loads(result.text)
        print(url, result.headers['Status'],
              result.headers['X-RateLimit-Limit'])
        result.raise_for_status()
    except requests.exceptions.RequestException as error:
        print(error)
        parsed_result = None
    return parsed_result


class Author:
    def __init__(self, AouthSession, login):
        print('Author module', login)
        self.AouthSession = AouthSession
        self.login = login
        self.validUser = True
        parsed_user = get_url(
            AouthSession, 'https://api.github.com/users/'+login)
        if not parsed_user:
            print('Author init error')
            self.validUser = False
        else:
            self.name = parsed_user['name']
            self.url = parsed_user['url']
            self.avatar = parsed_user['avatar_url']

    def get_team_by_close_commits(self):

        team = defaultdict(lambda: 0)
        commits = self.get_commits()
        for commit in commits:
            persons = self.get_repo_team(
                commit['repo_name'], commit['commit_date'])
            for person in persons:
                team[person] += 1
        return team

    def get_repo_team(self, repo_name, date):
        commit_date = datetime.datetime.strptime(date[:10], DATE_FORMAT)
        date_start = str(commit_date-datetime.timedelta(days=3))[:10]
        date_end = str(commit_date+datetime.timedelta(days=3))[:10]
        payload = {
            'q': 'repo:'+repo_name + ' author-date:' + date_start + '..' + date_end
        }
        parsed_result = get_url(self.AouthSession,
                                'https://api.github.com/search/commits', payload=payload)
        if not parsed_result:
            return []
        data = list(map(lambda p: p['author']['login'],
                        filter(lambda k: k['author'], parsed_result['items'])))
        return data

    def get_commits(self):
        payload = {
            'q': 'author:' + self.login
        }
        parsed_result = get_url(
            self.AouthSession, 'https://api.github.com/search/commits', payload=payload)
        if not parsed_result:
            return []
        data = list(map(lambda p: {'repo_name': p['repository']['full_name'],
                                   'commit_date': p['commit']['committer']['date']},
                        parsed_result['items']))
        return (data)

    def get_comment_authors(self, url):
        parsed_result = get_url(self.AouthSession, url)
        if not parsed_result:
            return []
        data = list(map(lambda p: p['user']['login'], parsed_result))
        return data

    def get_team_by_pullrequests(self):
        team = defaultdict(lambda: 0)
        payload = {
            'q': 'author:' + self.login + ' type:pr'
        }
        parsed_result = get_url(
            self.AouthSession, 'https://api.github.com/search/issues', payload=payload)
        if not parsed_result:
            return []
        comments_urls = list(map(lambda p: p['comments_url'], filter(
            lambda k: k['comments'] != 0, parsed_result['items'])))
        # print(comments_urls)
        for url in comments_urls:
            logins = self.get_comment_authors(url)
            for login in logins:
                team[login] = 1
        return (team)

    def get_followers(self):
        url = 'https://api.github.com/users/'+self.login + '/followers'
        parsed_result = get_url(self.AouthSession, url)
        if not parsed_result:
            return []
        team = list(map(lambda p: p['login'], parsed_result))
        return (team)

    def get_following(self):
        url = 'https://api.github.com/users/'+self.login + '/following'
        parsed_result = get_url(self.AouthSession, url)
        if not parsed_result:
            return []
        team = list(map(lambda p: p['login'], parsed_result))
        # print(comments_urls)
        return (team)


# author = Author("oktocat")
# print(author.name)
# print(author.login)
# print(author.url)
# print(author.avatar)
# # print('team by commits',author.get_team_by_close_commits())
# prs = author.get_comment_authors('https://api.github.com/repos/cocaine/cocaine-plugins/issues/38/comments')
# print('team by pull requests',author.get_team_by_pullrequests())


# team = author.get_repo_team(commit['repo_name'],commit['commit_date'])
# print('team',team)

# print("committs for user Mrugesh Mohapatra:", author.name)

# lst= get_committers("freeCodeCamp/freeCodeCamp",'2020-04-30T11:37:24.000-07:00')
# print(lst)
