FROM node:18-buster-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
# ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/
# RUN npm ci --only=production
RUN npm ci
RUN npm run build
RUN npm prune --production
ENV NODE_ENV=production
USER node
CMD ["dumb-init", "node", "dist/index.js"]