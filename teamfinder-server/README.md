A simple Flask App that allows:

- Login with GitHub (this allow App to access data that is not publicly accessible)
- An Api to get a list of possible 'teammates' for given GitHub username

What is the 'teammate'?
Possible teammates are concidered GitHub users

- who commented on pull requests,
- who comitted to the same repo within 3 days,
- followeres and followees

To run this application:

```
sh run.sh
```

Beware that build artifacts of client application are served as static content by Flask Server. Before starting server be sure that client app is built.
