# Use official Node.js LTS image
FROM node:16-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies including node-calendar
RUN npm install
RUN apt update && apt install -y curl wget

# Copy rest of app files
COPY . .

# Run tests inside build (optional but useful)
RUN npm test

# Set default environment variables
ENV COLOR=blue
ENV CALENDAR=false
ENV COUNTRY="Cameroon"

# Expose the app port
EXPOSE 8080
# Maintainer and metadata
LABEL maintainer="Hilltop Consultancy <support@htconsult.dk>"
LABEL description="A customizable color display app with calendar and country info, backed by Express.js"
LABEL org.opencontainers.image.source="https://github.com/hilltopconsultancy/globe"
LABEL org.opencontainers.image.documentation="https://github.com/hilltopconsultancy/globe#readme"

# Start the app
CMD ["node", "app.js"]
