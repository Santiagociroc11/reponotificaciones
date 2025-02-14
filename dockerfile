# Usa una imagen oficial de Node.js
FROM node:18

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json e instala TODAS las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Servir la aplicación con `serve`
CMD ["npm vite preview"]