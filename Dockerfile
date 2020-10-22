FROM node:12-slim

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]