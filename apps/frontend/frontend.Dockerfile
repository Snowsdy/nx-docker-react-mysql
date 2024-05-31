# Stage 1: Build the React/Vite app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the specific React/Vite app
# Replace 'your-react-vite-app' with the actual app name
RUN npx nx build frontend

# Stage 2: Serve the app
FROM nginx:alpine

# Copy the built app from the previous stage
# Replace 'your-react-vite-app' with the actual app name
COPY --from=build /app/dist/apps/frontend /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
