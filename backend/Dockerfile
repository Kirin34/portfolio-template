# ------------------------------
# BUILDER
# ------------------------------
FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev


# ------------------------------
# RUNNER
# ------------------------------
FROM node:20-bullseye AS runner

WORKDIR /app
ENV NODE_ENV=production

# 🔴 COPIA TUTTO L’APP BUILT, NON A PEZZI
COPY --from=builder /app /app

RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 8080
CMD ["npm", "run", "start"]
