FROM node:12.7-alpine

WORKDIR /workdir/backend

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

RUN npm install -g pm2

COPY . .

ENV PATH=/workdir/backend/node_modules/.bin:$PATH

WORKDIR /workdir/backend/src

EXPOSE 3333

ENV VIRTUAL_HOST=heroappjs-back.marques.top

HEALTHCHECK --interval=1m --timeout=5s \
  CMD curl -f http://127.0.0.1:3333/ongs || exit 1

ENTRYPOINT [ "pm2-runtime", "server.js" ]







