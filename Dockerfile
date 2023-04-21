FROM node:16-slim

RUN npm install -g @nestjs/cli@9.0.0

WORKDIR /home/node/app_nest_user

COPY . .

RUN npm install

EXPOSE 3001
