FROM node:14.4.0

WORKDIR /usr/app

COPY ./package.json ./

# Install Some Dependencies
RUN npm install

COPY ./ ./

# default Command
CMD ["npm","start"]