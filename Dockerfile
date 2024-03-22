# Use uma imagem base
FROM node:18 as build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o contêiner
COPY . .

# Compile o código
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta em que a aplicação será executada
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["nginx", "-g", "daemon off;"]
