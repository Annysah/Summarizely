FROM node:21

WORKDIR usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]