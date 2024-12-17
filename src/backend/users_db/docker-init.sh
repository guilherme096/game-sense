#!/bin/bash
set -e

# Enhanced debugging
echo "Starting initialization script..."
echo "Current user: $(whoami)"
echo "Current directory: $(pwd)"

# Debug: Print environment variables
echo "MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:+REDACTED}"
echo "USERS_DATABASE: $USERS_DATABASE"
echo "USERS_USER: $USERS_USER"
echo "USERS_PASSWORD: ${USERS_PASSWORD:+REDACTED}"

# Check if required environment variables are set
if [ -z "$MYSQL_ROOT_PASSWORD" ] || [ -z "$USERS_DATABASE" ] || [ -z "$USERS_USER" ] || [ -z "$USERS_PASSWORD" ]; then
    echo "ERROR: One or more required environment variables are not set!"
    exit 1
fi

echo "Waiting for MySQL to initialize..."
# Increased timeout and added more verbose waiting
timeout=300
while [ $timeout -gt 0 ]; do
    if mysqladmin ping -h "localhost" --silent; then
        echo "MySQL is ready."
        break
    fi
    echo "Waiting... $timeout seconds remaining"
    sleep 5
    ((timeout-=5))
done

if [ $timeout -le 0 ]; then
    echo "ERROR: MySQL did not become ready in time!"
    exit 1
fi

# Ensure the directory exists and has correct permissions
mkdir -p /docker-entrypoint-initdb.d
chmod 755 /docker-entrypoint-initdb.d

# Substitute variables and generate init.sql
envsubst < /docker-entrypoint-initdb.d/init.template.sql > /docker-entrypoint-initdb.d/init.sql

# Ensure the init.sql file has correct permissions
chmod 644 /docker-entrypoint-initdb.d/init.sql

# Debug output
echo "Generated init.sql contents:"
cat /docker-entrypoint-initdb.d/init.sql

# Verify file permissions
ls -l /docker-entrypoint-initdb.d/

# Execute the SQL file
mysql -u root -p"$MYSQL_ROOT_PASSWORD" < /docker-entrypoint-initdb.d/init.sql

# Use the original docker-entrypoint.sh script from the mysql image
exec docker-entrypoint.sh "$@"