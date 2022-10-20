FROM node:16-alpine
RUN apk add --no-cache python3 make g++
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
COPY app.ts ./
COPY src/ ./src/
COPY config/ ./config/
RUN chown -R node:node /home/node/app
USER node
RUN npm install
RUN npx tsc --build
CMD [ "node", "dist/app.js" ]
