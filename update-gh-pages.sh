#!/bin/bash
set -ev
echo "Script update-gh-pages..."
echo "$TRAVIS_PULL_REQUEST"
pwd
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update gh-pages\n"

  #go to home and setup git
  cd gh-pages
  pwd
  git config --global user.email "deltagraphs@gmail.com"
  git config --global user.name "deltagraphsManager"

  #add, commit and push files
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
  git push -fq origin gh-pages

  echo -e "Done export reports\n"
fi
echo "Fine script update-gh-pages..."