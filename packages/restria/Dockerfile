FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock /usr/src/app/
COPY package.json /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3009

# Setup ENV
ENV NODE_ENV=production
ENV ENTRIA_ENV=development

ENV API_PORT=3009
ENV SLACK_WEBHOOK=
ENV MONGO_URI=mongodb://localhost/restria-dev
ENV REDIS_HOST=localhost

ENV JWT_KEY=rest-api-boilerplate

ENV AWS_ACCESS_KEY_ID=
ENV AWS_SECRET_ACCESS_KEY=
ENV AWS_REGION=

RUN npm run build
