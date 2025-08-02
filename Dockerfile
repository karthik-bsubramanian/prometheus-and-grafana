FROM node:20

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Install TypeScript globally
RUN npm install -g typescript

# Copy source code
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN tsc -b

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
