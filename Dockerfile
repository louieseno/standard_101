# Small size
FROM node:22-alpine

# Sets the working directory inside the container to /user/src/app
WORKDIR /usr/src/app

# Copy dependencies
# Will only invalidate cache when this files change
COPY package*.json ./ 

# Installs the application dependencies in the container
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]