# Use supported Node.js LTS image
FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install
RUN apt-get update && apt-get install -y curl wget

COPY . .

RUN npm test

ENV COLOR=blue
ENV CALENDAR=false
ENV COUNTRY="Cameroon"

EXPOSE 8080

LABEL maintainer="Hilltop Consultancy <support@htconsult.dk>"
LABEL description="A customizable color display app with calendar and country info, backed by Express.js"
LABEL org.opencontainers.image.source="https://github.com/hilltopconsultancy/globe"
LABEL org.opencontainers.image.documentation="https://github.com/hilltopconsultancy/globe#readme"

CMD ["node", "app.js"]
