FROM node:carbon-alpine
WORKDIR /usr/src/ayro-website
COPY ./package*.json ./
RUN apk add --no-cache --virtual .build-deps make gcc g++ python && \
  npm install --production --silent && \
  apk del .build-deps
COPY . .
EXPOSE 4000
CMD ["npm", "start"]