FROM nikolaik/python-nodejs:python3.9-nodejs14-alpine
COPY . /app/
WORKDIR /app/
RUN cp .env.example .env
RUN npm i --loglevel verbose
RUN tsc
EXPOSE 9999
ENTRYPOINT node build/index.js
