FROM node:16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

ADD package*.json /app

COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm i --silent

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]