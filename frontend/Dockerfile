FROM node:12.7-alpine AS build
WORKDIR /usr/src/front
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . .

#ENV REACT_APP_BASE_APP_URL https://heroappjs-back.marques.top
#http://localhost:3333


RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/front/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]