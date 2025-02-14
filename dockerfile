# Usa una imagen oficial de Node.js
FROM node:18

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json e instala TODAS las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .


# Instalar `serve` para producción
RUN npm install -g serve

# Exponer el puerto 1112
EXPOSE 1112

# Servir la aplicación con `serve`
CMD ["sh", "-c", "exec serve -s dist -l 1112"]