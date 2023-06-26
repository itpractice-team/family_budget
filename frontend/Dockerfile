# build env
FROM node:20-alpine as build
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD cp -r build result_build
