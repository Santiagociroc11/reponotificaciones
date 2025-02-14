# 🏗 Base: Usa Node.js para ejecutar la app
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que correrá la app (puedes cambiarlo si EasyPanel requiere otro)
EXPOSE 1112

# Ejecutar la aplicación con Vite en modo producción
CMD ["npm", "run", "preview", "--", "--host", "--port", "1112"]
