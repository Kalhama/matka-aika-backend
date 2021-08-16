# DIR=/var/www/metropaccess-visualiser
# yarn install
# yarn build
# rsync -avh --delete package.json yarn.lock max@kuube.fi:$DIR/app/
# rsync -avh --delete build/ max@kuube.fi:$DIR/app/build

# COMMAND=". ~/.nvm/nvm.sh && cd $DIR && cp ormconfig.json app/ && cp ecosystem.config.js app/ && cd app/ && yarn reload"
# ssh -t max@kuube.fi "$COMMAND"