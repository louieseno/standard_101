# Small size
FROM node:22.12.0-alpine3.21

# Sets the working directory inside the container to /user/src/app
WORKDIR /usr/src/app

# Will only invalidate cache when this files change
COPY package*.json ./ 

# Installs the application dependencies in the container
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]