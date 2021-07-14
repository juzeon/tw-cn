FROM node:lts-alpine as frontend
COPY . /app/
WORKDIR /app/
RUN cp .env.example .env
RUN set -x ; rm -rf yarn.lock && yarn && yarn build

FROM nginx:alpine as nginx
COPY --from=frontend /app/build/* /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/
EXPOSE 80

ENV API_BASE_URL=http://localhost:9999/

CMD echo "{ \
            \"API_BASE_URL\": \"$API_BASE_URL\" \
          } \
" > config.json && nginx -g daemon off;
