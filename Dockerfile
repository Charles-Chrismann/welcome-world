FROM node:16

USER node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/node

ADD package*.json /app/

COPY prisma ./prisma/

COPY .env ./

COPY . .

USER root

RUN npm i --silent

RUN npx prisma generate

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]