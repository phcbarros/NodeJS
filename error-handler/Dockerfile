# --------------> The build image
FROM node:18-buster-slim as build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /usr/src/app
COPY tsconfig.json . /usr/src/app/
COPY package*.json . /usr/src/app/
# RUN npm ci --only=production 
RUN npm ci --ignore-scripts
COPY src ./src
RUN npm run build
RUN npm prune --production
ENV NODE_ENV=production

# --------------> The production image
FROM node:18-buster-slim
ENV NODE_ENV=production
ENV TZ=UTC
EXPOSE 3000
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist .
CMD ["dumb-init", "node", "index"]