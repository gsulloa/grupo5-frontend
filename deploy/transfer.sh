# Build the app
yarn build;

# Compress the build
tar -czvf arquitran.tar.gz ./build

# transfer to host
sshpass -p $REMOTE_PASSWORD scp arquitran.tar.gz $REMOTE_USER@$REMOTE_HOST:~

sshpass -p $REMOTE_PASSWORD scp ./deploy/start.sh $REMOTE_USER@$REMOTE_HOST:~

# connect to host
sshpass -p $REMOTE_PASSWORD ssh $REMOTE_USER@$REMOTE_HOST "sh ./start.sh"