#!/bin/bash
clear;

BACKUP_OLD_DB=$4;

DB_NAME=$1;
DB_USER=$2;
PASSWORD=$3

DBS_PATH="$HOME/pg_databases";
NEW_DB="$DBS_PATH/$DB_NAME";

export LC_CTYPE=pt_BR.UTF-8;

start_db () {
    cd $DBS_PATH;
    pg_ctl -D "$DB_NAME" -l logfile start
    cd -;
};

stop_db () {
    cd $DBS_PATH;
    pg_ctl -D "$DB_NAME" -l logfile stop
    cd -;
    sleep 3;
    killall -9 postgres;
};

if [ $2 == "start" ]; then
    start_db
    exit;
fi;

if [ $2 == "stop" ]; then
    stop_db
    exit;
fi;


echo DB Name: ${DB_NAME:?You need to provide a name for the database as the first param}
echo DB_USER: ${DB_USER:?You need to provide a name for the db user as the second param}
echo DB PASSWORD: ${PASSWORD?You need to provide a password for db as the third param}

init_folder() {
    if [ -d $NEW_DB ]; then
        echo "DBs folder: $DBS_PATH";
    else
        mkdir -p $DBS_PATH;
        echo "Created DBs folder in $DBS_PATH"
    fi;
}


init_db () {
    cd $DBS_PATH;

    if [ -d $NEW_DB ]; then
        if [ $BACKUP_OLD_DB == 1 ]; then
            mv  $NEW_DB "$NEW_DB"".bkp.$(date +"%s")";
         else
            rm -rf $NEW_DB;
         fi
        initdb $DB_NAME;
    else
        initdb $DB_NAME;
    fi

    pg_ctl -D "$DB_NAME" -l logfile start;

    cd -;
};

recreate_db() {
    # stop db process
    psql -h localhost postgres ${USER} <<- _EOF_
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${DB_NAME}'
          AND pid <> pg_backend_pid();
        \q
_EOF_

    psql -h localhost postgres ${USER} <<- _EOF_
    DROP DATABASE ${DB_NAME};
    CREATE DATABASE ${DB_NAME};
    DROP ROLE ${DB_USER};
    CREATE USER ${DB_USER} WITH PASSWORD '${PASSWORD}';
    GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}" to ${DB_USER};
    ALTER USER ${DB_USER} WITH SUPERUSER;

    DROP DATABASE ${DB_NAME}_test;
    CREATE DATABASE ${DB_NAME}_test;
    CREATE USER ${DB_USER} WITH PASSWORD '${PASSWORD}';
    GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}_test" to ${DB_USER};
    ALTER USER ${DB_USER} WITH SUPERUSER;
_EOF_
}

stop_db;
init_folder;
init_db;
recreate_db;
stop_db;
start_db;
