FROM node:argon

ADD . /image-service
WORKDIR /image-service

RUN npm install

RUN chmod 755 ./wait-for-it.sh

CMD ./wait-for-it.sh db:3306 -- npm start
