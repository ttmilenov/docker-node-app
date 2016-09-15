FROM node:argon

ADD ../image-service /image-service
WORKDIR /image-service

RUN npm install

ENTRYPOINT ["npm", "start"]
