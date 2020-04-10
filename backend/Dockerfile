FROM node:12.7-alpine AS build

WORKDIR /workdir/backend/

COPY package.json .

RUN npm install

ENV PATH /workdir/backend/node_modules/.bin/:$PATH

COPY . .

EXPOSE 3333
 
ENTRYPOINT [ "npm run start" ]







