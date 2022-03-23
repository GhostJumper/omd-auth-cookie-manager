FROM node:17.7.1-alpine

WORKDIR /home/node/app
COPY . .

RUN npm i


USER node

EXPOSE 3000