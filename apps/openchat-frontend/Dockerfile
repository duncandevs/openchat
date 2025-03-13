FROM node:18-alpine AS builder

WORKDIR /app
COPY . . 

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app . 
EXPOSE 3000

CMD ["yarn", "start"]
