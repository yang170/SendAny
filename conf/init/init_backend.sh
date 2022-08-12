#!/bin/bash

# grant permissions
# https://stackoverflow.com/questions/23411520/how-to-fix-error-laravel-log-could-not-be-opened
chown -R $USER:www-data storage
chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# wait for the database
wait-for-it mariadb:3306 -t 60 -- echo "database is up"

echo "migrating changes to the database"
php artisan migrate

# run
echo "starting php-fpm and nginx"
php-fpm
nginx -g 'daemon off;'
