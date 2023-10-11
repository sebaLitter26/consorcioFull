FROM node:18.10.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm","run","start"]