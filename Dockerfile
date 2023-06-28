# Stage 1: Build the Prisma Client
FROM node:14-alpine as prisma-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate


# Stage 2: Build the App
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=prisma-builder /app/node_modules/.prisma /app/node_modules/.prisma

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
