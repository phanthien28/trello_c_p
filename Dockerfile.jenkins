FROM jenkins/jenkins:lts

USER root

# Cài curl, Node.js và npm
RUN apt-get update && apt-get install -y curl gnupg2 \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Cài Playwright và các browser dependencies
RUN npm install -g playwright \
    && npx playwright install --with-deps

# Set lại user Jenkins
USER jenkins
