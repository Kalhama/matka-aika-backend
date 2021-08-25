DIR=/var/www/metropaccess-visualiser-backend
yarn install
yarn build
rsync -avh --delete package.json yarn.lock max@metropaccess.max.kalhama.fi:$DIR/app/
rsync -avh --delete build/ max@metropaccess.max.kalhama.fi:$DIR/app/build
rsync -avh --delete populateDatabase.sh max@metropaccess.max.kalhama.fi:$DIR/app/

COMMAND=". ~/.nvm/nvm.sh && cd $DIR && cp ormconfig.json app/ && cp ecosystem.config.js app/ && cd app/ && yarn reload"
ssh -t max@metropaccess.max.kalhama.fi "$COMMAND"