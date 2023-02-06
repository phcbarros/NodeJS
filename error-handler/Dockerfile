# build ts
FROM node:18-buster-slim as build
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
WORKDIR /usr/src/app
COPY tsconfig.json /usr/src/app/
COPY tsup.config.ts /usr/src/app/
COPY package*.json /usr/src/app/
RUN npm ci --ignore-scripts
COPY src ./src
RUN npm run build
RUN npm prune --production

# remove ts things from image
FROM node:18-buster-slim as ts-remover
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json /usr/src/app
COPY --from=build /usr/src/app/dist /usr/src/app/dist
RUN npm ci --only=production --ignore-scripts

# production image
FROM node:18-buster-slim
ENV NODE_ENV=production
ENV TZ=UTC
EXPOSE 3000
COPY --from=build /tini /tini
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=ts-remover /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=ts-remover /usr/src/app/dist .
ENTRYPOINT ["/tini", "--"]
CMD ["node", "index"]
