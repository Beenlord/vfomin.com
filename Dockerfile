FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "./node_modules/nuxt/bin/nuxt.js", "start"]
