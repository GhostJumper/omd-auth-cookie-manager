# syntax=docker/dockerfile:1
FROM node:18-alpine3.14 as builder

WORKDIR /home/node/app

COPY src/. src/.
COPY app.ts .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install
RUN npm i -g typescript
RUN tsc 


FROM node:18-alpine3.14

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
COPY --from=builder /home/node/app/build/ .

RUN npm install --production

EXPOSE 3000

USER node

ENTRYPOINT [ "node", "app.js" ]