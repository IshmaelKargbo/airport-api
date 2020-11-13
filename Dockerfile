FROM node:13-slim

WORKDIR /app

ADD . /app

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]