FROM node:12.7-alpine AS build
WORKDIR /usr/src/front
COPY package.json ./
RUN npm install
COPY . .
ENV REACT_APP_BASE_APP_URL=http://backend
RUN npm run build

FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/front/build /usr/share/nginx/html



EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]