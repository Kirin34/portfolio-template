FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./

# installa TUTTE le dipendenze necessarie (incluso admin)
RUN npm ci

COPY . .

# build dell'admin panel (genera dist/build)
RUN npm run build



# ------------------------------
# RUNNER
# ------------------------------
FROM node:20-bullseye AS runner

WORKDIR /app

# Copiamo TUTTO (node_modules inclusi)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# NON reinstalliamo niente!
# npm ci --omit=dev NON DEVE ESSERE USATO QUI

RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 1337

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
