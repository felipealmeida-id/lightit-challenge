# **** Stage 1 - Build ****
FROM node:20-alpine as build
WORKDIR /app
RUN pnpm add -g nodemon
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i
COPY . .
RUN pnpm build

# **** Stage 2 - Deploy ****
FROM node:16-alpine
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml ./
RUN pnpm i -P
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["/bin/sh", "-c", "pnpm run-migrations:dev;pnpm start"]