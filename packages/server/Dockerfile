FROM node:8

MAINTAINER Entria <hello@entria.com.br>

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm i

COPY . /app

#cachable
RUN npm run build

CMD ["npm", "start"]
