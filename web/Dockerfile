# ベースイメージとしてNode.jsを使用
FROM node:20-alpine

# 作業ディレクトリを指定
WORKDIR /app

# パッケージマネージャーで必要な依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコンテナにコピー
COPY . .

# サーバーを起動する
CMD ["npm", "run", "dev"]
