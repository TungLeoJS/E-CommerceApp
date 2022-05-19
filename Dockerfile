FROM node:16

WORKDIR /usr/src/ecommerce-app

COPY package*.json ./

RUN yarn install

COPY . .