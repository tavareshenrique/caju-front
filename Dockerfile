FROM node:20-buster

WORKDIR /app

RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000
EXPOSE 3001

CMD ["sh", "-c", "if [ \"$SERVICE\" = 'front' ]; then pnpm dev; else pnpm init:db; fi"]
