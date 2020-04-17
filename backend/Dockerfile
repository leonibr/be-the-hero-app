FROM node:12.7-alpine

WORKDIR /workdir/backend

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

RUN npm install -g pm2

COPY . .

ENV PATH /workdir/backend/node_modules/.bin:$PATH

WORKDIR /workdir/backend/src

EXPOSE 3333

 
ENTRYPOINT [ "pm2-runtime", "server.js" ]







