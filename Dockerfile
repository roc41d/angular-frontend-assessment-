FROM node:alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build -- --output-path=./dist/ui/ --configuration='production'

FROM nginx:alpine as prod-stage

COPY --from=build-stage /app/dist/ui/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080