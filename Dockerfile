FROM node:20-alpine

WORKDIR /srv/cf.archivosprivados

COPY package*.json ./

RUN npm ci --omit=dev \
  && npm cache clean --force

COPY . .

CMD ["npm", "run", "dev"]