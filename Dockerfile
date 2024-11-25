# Build stage ###################################################
FROM node:23.1.0-alpine AS build

WORKDIR /srv

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# Production stage ###################################################
FROM node:23.1.0-alpine AS production

WORKDIR /srv

COPY package*.json .

RUN npm ci 
# --only=production

COPY --from=build /srv/prisma ./prisma
RUN npx prisma generate


COPY --from=build /srv/dist ./dist
#COPY --from=build /srv/privat ./privat
COPY --from=build /srv/src ./src

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/main.js"]