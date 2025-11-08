# ---------------------------
# STAGE 1: BUILD
# ---------------------------
FROM node:20-bullseye AS builder   


WORKDIR /app

# Copia i pacchetti
COPY package*.json ./

# Installa tutte le dipendenze (inclusa dev, serve per build)
RUN npm ci

# Copia tutto il codice sorgente
COPY . .

# Aumenta la memoria e builda l’admin panel
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# ---------------------------
# STAGE 2: RUN (production)
# ---------------------------
FROM node:20-bullseye AS runner

WORKDIR /app

# Copia solo i file necessari per l'esecuzione
COPY package*.json ./
RUN npm ci --omit=dev    # installa solo le dipendenze di produzione

# Copia dal builder le directory essenziali
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.tmp ./tmp
COPY --from=builder /app/src ./src
COPY --from=builder /app/config ./config

# Crea utente non root
RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
USER strapi

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
