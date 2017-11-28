FROM node:carbon
WORKDIR /usr/src/ayro-website
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "server-start"]