FROM node:20-bullseye AS builder

WORKDIR /app

# 1️⃣ Copio package.json + lock
COPY package*.json ./

# 2️⃣ Copio il codice PRIMA dell’installazione
COPY . .

# 3️⃣ Creo node_modules
RUN npm ci

# 4️⃣ Buildo Strapi
RUN npm run build


# ---------------------------
# STAGE 2: RUN (production)
# ---------------------------
FROM node:20-bullseye AS runner

WORKDIR /app

# Copia solo i file necessari
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules    
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/config ./config

# Rimuoviamo explicitamente .tmp (SQLite)
RUN rm -rf .tmp

# Fix permessi
RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app

USER strapi

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
