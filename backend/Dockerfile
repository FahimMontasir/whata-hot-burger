FROM node:16-alpine
WORKDIR /backend
COPY package.json .
RUN npm install
COPY . ./
ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start"]