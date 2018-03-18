#! /bin/sh
git push heroku `git subtree split --prefix app/ master`:master --force