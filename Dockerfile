FROM node:carbon-alpine
WORKDIR /usr/src/ayro-website
COPY ./package*.json ./
RUN \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
  echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
  apk --no-cache update && \
  apk add --update --no-cache --virtual .build-deps make gcc g++ python && \
  apk add --update --no-cache udev ttf-freefont chromium && \
  npm install --production --silent && \
  apk del .build-deps && \
  rm -rf /var/cache/apk/* /tmp/* && \
  touch config.properties
COPY . .
EXPOSE 4000
CMD ["npm", "start"]