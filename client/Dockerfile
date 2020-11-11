FROM node:14.4.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# Install Some Dependencies
RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm build

# default Command
CMD ["npm","start"]