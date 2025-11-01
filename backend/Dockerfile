
FROM node:20-alpine AS builder

WORKDIR /app

# Install only dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build admin panel with more memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build



FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/.tmp ./tmp
COPY --from=builder /app/src ./src

# Optional: create a non-root user for security
RUN addgroup -S strapi && adduser -S strapi -G strapi
USER strapi

EXPOSE 1337

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
