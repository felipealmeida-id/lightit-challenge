FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm i --production
CMD ["node", "src/index.js"]
EXPOSE 8080

# # **** Stage 1 - Build ****
# FROM node:20-alpine as build
# WORKDIR /app
# RUN pnpm add -g nodemon
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install
# COPY . .
# RUN pnpm build

# # **** Stage 2 - Deploy ****
# FROM node:20-alpine
# WORKDIR /app
# COPY --from=build /app /app
# RUN pnpm install --production
# EXPOSE 8080
# CMD ["sh", "-c", "pnpm run-migrations:dev && pnpm start"]