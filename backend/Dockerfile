FROM node:lts-alpine
COPY . /app/
WORKDIR /app/
RUN cp .env.example .env
RUN set -x ; npm i && tsc
EXPOSE 9999
ENTRYPOINT node build/index.js
