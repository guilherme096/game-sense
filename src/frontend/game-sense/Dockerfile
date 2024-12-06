# Stage 1: Build
FROM node:18 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY ./nginx.conf ./
RUN npm install || cat /usr/src/app/npm-error.log
COPY . ./
RUN npm run build || cat /usr/src/app/build-error.log

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
