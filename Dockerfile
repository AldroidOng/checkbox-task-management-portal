FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --production

# Set environment variables
ENV NEXT_PUBLIC_API_URL=http://localhost:80 

EXPOSE 4000
CMD ["sh", "-c", "PORT=4000 npm start"]
