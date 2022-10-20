# FROM node:14

# RUN mkdir /app
# WORKDIR /app

# COPY package.json /app
# RUN npm install --only=prod
# COPY . /app/

# RUN chmod +777 /app/server/uploads

# ENV NODE_ENV production
# ENV PORT 3000

# EXPOSE 3000

# CMD ["npm", "start"]
# -----------------------
# Imagen de node
FROM node:14

# Set del directorio de trabajo
WORKDIR /usr/src/app

# Copiamos los package al directorio de trabajo
COPY package*.json ./

# Instalamos dependencias de node
RUN npm install


# Copiamos los archivos al contenedor
COPY . .

RUN chmod +777 /server/uploads

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

# Comando para correr el programa
CMD [ "node", "./src/server/server.js" ]

