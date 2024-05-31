# Stage 1: Build the Node.js app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the specific ExpressJS/NodeJS app
# Replace 'your-express-app' with the actual app name
WORKDIR /app/apps/backend-express
RUN npx nx build backend-express

# Stage 2: Create the production image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist/apps/backend-express /app

# Copy the package.json and yarn.lock files
COPY package.json ./

# Install only production dependencies
RUN npm install --production

# Expose port (adjust if your app uses a different port)
EXPOSE 3333

# Start the application
CMD ["node", "main.js"]
