# Usar la imagen oficial de Node.js versión 14 como imagen base
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de definición de paquetes al directorio de trabajo actual
COPY backend/package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente de la aplicación al contenedor
COPY backend/ ./

# Compilar la aplicación
RUN npm run build

# Exponer el puerto 3000 para poder acceder a la aplicación
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "dist/main"]
