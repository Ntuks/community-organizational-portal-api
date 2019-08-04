FROM node:10-alpine

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# COPY always copies files as root. change owner after copy
COPY . .

EXPOSE 7900

CMD [ "npm", "start" ]
