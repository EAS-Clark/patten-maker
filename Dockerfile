FROM node:14-alpine as build
ENV CI=false
COPY . /builder/
WORKDIR /builder/
RUN npm install
RUN npm run-script build

FROM nginx:alpine
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /builder/build /usr/share/nginx/html
RUN chmod -R 0777 /usr/share/nginx/html