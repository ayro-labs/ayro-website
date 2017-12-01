FROM node:carbon
WORKDIR /usr/src/ayro-website
COPY . .
EXPOSE 4000
CMD ["npm", "start"]