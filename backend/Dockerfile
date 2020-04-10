FROM node:12.7-alpine AS build

WORKDIR /workdir/backend/

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3333
 
ENTRYPOINT [ "npm run start" ]







