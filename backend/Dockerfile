FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm ci


RUN npm run build


FROM node:20-bullseye AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules    
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

RUN rm -rf .tmp

RUN addgroup --system strapi && adduser --system --ingroup strapi strapi
RUN chown -R strapi:strapi /app

USER strapi

EXPOSE 1337
ENV NODE_ENV=production

CMD ["npm", "run", "start"]
