FROM node:12.7-alpine

WORKDIR /workdir/backend

COPY package.json .

ENV VIRTUAL_HOST heroappjs-back.marques.top
ENV LETSENCRYPT_HOST heroappjs-back.marques.top

COPY . .

ENV PATH /workdir/backend/node_modules/.bin:$PATH

RUN npm install -g pm2

RUN npm install --silent

WORKDIR /workdir/backend/src


EXPOSE 3333


 
ENTRYPOINT [ "pm2-runtime", "server.js" ]







