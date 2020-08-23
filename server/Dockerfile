FROM node:12-slim

WORKDIR /usr/src/server
COPY package.json .
RUN npm install
RUN npm install -g nodemon

EXPOSE 4000
CMD [ "npm", "start" ]

COPY . .