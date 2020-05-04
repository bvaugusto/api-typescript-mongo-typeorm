FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g typescript
RUN npm install

COPY . .

EXPOSE 8000

RUN npm run compile

CMD cp -r config/. . && npm run migration && npm start
