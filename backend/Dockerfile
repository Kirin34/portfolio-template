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
COPY --from=builder /app/.cache ./.cache

# Fix percorso admin Strapi 5.x
RUN mkdir -p node_modules/@strapi/admin/dist/server/server && \
    if [ -d node_modules/@strapi/admin/dist/admin/build ]; then \
      cp -R node_modules/@strapi/admin/dist/admin/build node_modules/@strapi/admin/dist/server/server/; \
    elif [ -d .cache/admin/build ]; then \
      cp -R .cache/admin/build node_modules/@strapi/admin/dist/server/server/; \
    fi

RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app
USER strapi

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
