FROM node:alpine

CMD mkdir /srv/cf.archivosprivados

COPY ["package.json","/srv/cf.archivosprivados/"]

WORKDIR /srv/cf.archivosprivados

RUN npm install --omit=dev

COPY [".", "/srv/cf.archivosprivados/"]

EXPOSE $PORT

CMD [ "npm", "run", "start" ]
