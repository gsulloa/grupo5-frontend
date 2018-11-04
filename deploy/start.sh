export REMOTE_APP_LOCATION='/var/www/arquitran'
# remove old version
rm -rf $REMOTE_APP_LOCATION/*

# extract the files
tar -xzvf arquitran.tar.gz -C $REMOTE_APP_LOCATION
mv $REMOTE_APP_LOCATION/build/* $REMOTE_APP_LOCATION
