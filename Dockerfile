FROM node:14

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install --only=prod
COPY . /app/

RUN chmod +777 /app/server/uploads

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]

