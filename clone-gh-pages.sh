if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to cloning gh-pages\n"

  cd $HOME
  
  #go to home and setup git
  git config --global user.email "deltagraphs@gmail.com"
  git config --global user.name "deltagraphsManager"

  #using token clone gh-pages branch
  git clone --branch=gh-pages https://${GH_TOKEN}@github.com/DeltaGraphs/norris-nrti.git  gh-pages > /dev/null

  echo -e "Cloned gh-pages\n"
fi