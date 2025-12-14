FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./

# installa TUTTE le dipendenze necessarie (incluso admin)
RUN npm ci

COPY . .

# build dell'admin panel (genera dist/build)
RUN npm run build

# mantieni solo le dipendenze necessarie in produzione
RUN npm prune --omit=dev


# ------------------------------
# RUNNER
# ------------------------------
FROM node:20-bullseye AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 8080

CMD ["npm", "run", "start"]
