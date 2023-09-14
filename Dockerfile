FROM node:18-alpine as builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/e-commerce-serv/index.html /usr/share/nginx/html
COPY --from=builder /app/dist/e-commerce-serv /usr/share/nginx/html/
