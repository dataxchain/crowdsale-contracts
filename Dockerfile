FROM node:8.11.4-stretch

WORKDIR /usr/src/app

COPY . .

RUN npm install
