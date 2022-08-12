FROM node:16-alpine
WORKDIR /backend
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --omit=dev; \
        fi

COPY . ./
ENV PORT 5000
EXPOSE $PORT
CMD [ "npm", "start" ]