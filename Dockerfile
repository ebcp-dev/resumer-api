FROM node:10

# Create app directory
WORKDIR /www

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "production-start" ]