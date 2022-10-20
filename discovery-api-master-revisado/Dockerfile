FROM node:alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install --omit=dev
COPY . /app/

RUN chmod 777 /app/server/uploads

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]