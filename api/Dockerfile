# Ruby 3.2.0をベースに使用
FROM ruby:3.2.0

# Node.jsとYarnをインストール（Rails 6以上で必要）
RUN apt-get update -qq && apt-get install -y nodejs npm

# 作業ディレクトリを作成
WORKDIR /app

# GemfileとGemfile.lockをコピー
COPY Gemfile Gemfile.lock ./

# 必要なGemをインストール
RUN bundle install

# アプリケーション全体をコピー
COPY . .

# 開発サーバーを起動
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]


# # これは本番環境向けのDockerfileです。Kamalや手動でビルドと実行に使用します:
# # docker build -t my-app .
# # docker run -d -p 80:80 -p 443:443 --name my-app -e RAILS_MASTER_KEY=<config/master.keyの値> my-app

# # .ruby-versionにあるRubyのバージョンに合わせます
# ARG RUBY_VERSION=3.2.0
# FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# # Railsアプリの作業ディレクトリを指定
# WORKDIR /rails

# # 基本的なパッケージをインストール
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y curl default-mysql-client libjemalloc2 libvips && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives

# # 本番環境用の設定
# ENV RAILS_ENV="production" \
#     BUNDLE_DEPLOYMENT="1" \
#     BUNDLE_PATH="/usr/local/bundle" \
#     BUNDLE_WITHOUT="development"

# # 不要なファイルを減らすためのビルド用ステージ
# FROM base AS build

# # Gemをビルドするために必要なパッケージをインストール
# RUN apt-get update -qq && \
#     apt-get install --no-install-recommends -y build-essential default-libmysqlclient-dev git pkg-config && \
#     rm -rf /var/lib/apt/lists /var/cache/apt/archives

# # アプリケーション用のGemをインストール
# COPY Gemfile Gemfile.lock ./
# RUN bundle install && \
#     rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
#     bundle exec bootsnap precompile --gemfile

# # アプリケーションコードをコピー
# COPY . .

# # bootsnapでコードを事前コンパイルして起動時間を短縮
# RUN bundle exec bootsnap precompile app/ lib/

# # 本番用の最終ステージ
# FROM base

# # ビルドした成果物（Gemやアプリケーション）をコピー
# COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
# COPY --from=build /rails /rails

# # セキュリティのため、非rootユーザーとして実行し、ランタイムファイルの所有権を設定
# RUN groupadd --system --gid 1000 rails && \
#     useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
#     chown -R rails:rails db log storage tmp
# USER 1000:1000

# # Entrypointはデータベースの準備を行う
# ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# # デフォルトでサーバーを起動。実行時に上書き可能
# EXPOSE 3000
# CMD ["./bin/rails", "server"]
