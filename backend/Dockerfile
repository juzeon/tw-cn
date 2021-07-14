FROM node:slim
COPY . /app/
WORKDIR /app/
RUN cp .env.example .env
RUN npm i --loglevel verbose
RUN tsc
EXPOSE 9999
ENTRYPOINT node build/index.js
