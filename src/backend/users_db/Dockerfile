FROM mysql:8.0

# Switch to root user for installation
USER root

# Install debugging tools
RUN apt-get update && apt-get install -y \
    gettext-base \
    procps \
    net-tools \
    telnet \
    && rm -rf /var/lib/apt/lists/*

# Copy initialization files
COPY init.template.sql /docker-entrypoint-initdb.d/init.template.sql
COPY docker-init.sh /docker-entrypoint-initdb.d/docker-init.sh

# Ensure scripts have execution permissions
RUN chmod +x /docker-entrypoint-initdb.d/docker-init.sh && \
    chmod 644 /docker-entrypoint-initdb.d/init.template.sql

# Switch back to mysql user
USER mysql