FROM node:18-alpine
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "app.ts", "./"]
COPY src/ ./src/
RUN npm install
RUN npx tsc --build
CMD [ "node", "dist/app.js" ]
