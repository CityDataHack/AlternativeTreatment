## Libraries


## Developing

Make sure you have Node.js installed.


```
npm install

```


for development use gulp

```
gulp
```

or if you just want to run the node app

```
npm start
```
(this will start a local server running on ``localhost:3000``)


## Deploying
Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you are logged in.

### Link the Heroku repo

Add Heroku remote url:

```
heroku git:remote -a spirit-of-the-place

--OR--

sh heroku-remote.sh
```

### Deploy

Pushing ``/app`` subdirectory to Heroku:

```
git subtree push --prefix app/ heroku master

--OR--

sh deploy.sh
```

### Force deploy (if needed)

If you get an error about the tip of the branch being out of sync:

```
git push heroku `git subtree split --prefix app/ master`:master --force

--OR--

sh deploy-force.sh
```
