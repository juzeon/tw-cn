FROM node:lts-alpine
COPY . /app/
WORKDIR /app/
RUN apk add python make gcc g++
RUN cp .env.example .env
RUN set -x ; rm -rf package-lock.json && npm i typescript -g && npm i --loglevel verbose
RUN tsc
EXPOSE 9999
ENTRYPOINT node build/index.js
