FROM node:16

WORKDIR /usr/src/ecommerce-app/backend

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]