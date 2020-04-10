FROM node:12.7-alpine AS build
WORKDIR /usr/src/front
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/front/build /usr/share/nginx/html

ENV BASE_APP_URL=backend

EXPOSE 80

ENTRYPOINT [ "nginx" ]