FROM node:16.15-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

FROM nginx:latest AS frontend

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d


CMD ["nginx", "-g", "daemon off;"]