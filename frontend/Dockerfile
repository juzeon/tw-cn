FROM node:lts-alpine as frontend
COPY . /app/
WORKDIR /app/
RUN set -x ; yarn && yarn build

FROM nginx:alpine as nginx
COPY --from=frontend /app/build/* /usr/share/nginx/html/
