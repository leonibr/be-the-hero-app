FROM node:12.7-alpine

WORKDIR /workdir/backend

COPY package.json .

ENV PATH /workdir/backend/node_modules/.bin:$PATH
ENV VIRTUAL_HOST https://heroappjs-back.marques.top
ENV LETSENCRYPT_HOST https://heroappjs-back.marques.top

RUN npm install

COPY . .

EXPOSE 3333
 
CMD [ "npm", "run", "start" ]







