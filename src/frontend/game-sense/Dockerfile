# Stage 1: Build
FROM node:18 AS build
WORKDIR /usr/src/app

# Only copy necessary files for npm install to leverage caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app code
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy build artifacts from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Optional: Use a minimal configuration if needed
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default HTTP port
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
