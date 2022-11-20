FROM node:latest

WORKDIR /app

EXPOSE 80

COPY routing/package*.json ./routing/

RUN cd routing && npm install

COPY . .

RUN chmod 777 /app/routing/node_modules

CMD ["node", "server.js"]