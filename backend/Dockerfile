FROM node:12.7-alpine

WORKDIR /workdir/backend

COPY package.json .

ENV VIRTUAL_HOST https://heroappjs-back.marques.top
ENV LETSENCRYPT_HOST https://heroappjs-back.marques.top

COPY . .

ENV PATH /workdir/backend/node_modules/.bin:$PATH

RUN npm install --silent


EXPOSE 3333
 
CMD [ "npm", "start" ]







