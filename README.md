# Alternative Treatment
CityDataHack March 2018


## Ideation
[Ideation workshop notes and outputs](https://github.com/CityDataHack/AlternativeTreatment/wiki/Ideation-workshop)

## Deploying
Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed and you are logged in.

Add Heroku remote url:

```
heroku git:remote -a spirit-of-the-place

--OR--

sh heroku-remote.sh
```


Push ``/app`` subdirectory to Heroku:

```
git subtree push --prefix app/ heroku master

--OR--

sh deploy.sh
```

If you get an error about the tip of the branch being out of sync:

```
git push heroku `git subtree split --prefix app/ master`:master --force

--OR--

sh deploy-force.sh
```


## Team members

- Jonathan Cohen
- Ilja Panic
- Ivan Pecorari
- Emanuil Tolev
- Maciek Ziarkowski
