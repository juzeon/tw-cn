FROM node:lts-alpine as frontend
COPY . /app/
WORKDIR /app/
RUN echo "REACT_APP_API_BASE_URL=http://backend:9999/" > .env
RUN set -x ; rm -rf yarn.lock && yarn && yarn build

FROM nginx:alpine as nginx
COPY --from=frontend /app/build/* /usr/share/nginx/html/
EXPOSE 80
