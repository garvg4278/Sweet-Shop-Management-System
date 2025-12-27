# Use stable Node LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose backend port (your app uses 4000)
EXPOSE 4000

# Run migrations + start server
# This ensures DB tables always exist (fresh volumes safe)
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
