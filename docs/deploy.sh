#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vitepress/dist

if [ -z "$GITHUB_TOKEN" ]; then
  msg='Local trigger deploy'
  githubUrl=git@github.com:CamWang/mirage.git
else
  msg='Github Action trigger deploy'
  githubUrl=https://camwang:${GITHUB_TOKEN}@github.com/CamWang/mirage.git
  git config --global user.name "camwang"
  git config --global user.email "camwang@outlook.com"
fi

git init
git add -A
git commit -m "${msg}"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f $githubUrl main:gh-pages

cd -