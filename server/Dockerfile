FROM node:latest

WORKDIR /usr/app

COPY ./package.json ./

# Install Some Dependencies
RUN npm install
RUN npm install react-scripts -g

COPY ./ ./

# default Command
CMD ["npm","start"]