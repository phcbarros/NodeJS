FROM node:18-buster-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm ci --only=production
CMD "npm" "start"