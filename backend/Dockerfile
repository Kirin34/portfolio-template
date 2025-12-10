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

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Fix: auto-detect admin build path and copy where Strapi runtime expects
# Fix: Strapi 5 admin build path mismatch
RUN mkdir -p node_modules/@strapi/admin/dist/server/server && \
    cp -R dist node_modules/@strapi/admin/dist/server/server/build


RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
