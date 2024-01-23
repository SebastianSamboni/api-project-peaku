# Utiliza la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que tu aplicación Node.js escucha
EXPOSE 8080

# Comando para ejecutar tu aplicación en Google Cloud Run
CMD ["npm", "dev"]