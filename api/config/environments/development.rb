require "active_support/core_ext/integer/time"

Rails.application.configure do
  # ここで指定された設定は、config/application.rbの設定よりも優先されます。

  # 開発環境では、アプリケーションのコードが変更されるたびに再読み込みされます。
  # これにより応答時間が遅くなりますが、コード変更時にWebサーバーを再起動する必要がありません。
  config.enable_reloading = true

  # 起動時にコードをイーガーロードしない。
  config.eager_load = false

  # 完全なエラーレポートを表示する。
  config.consider_all_requests_local = true

  # サーバーのタイミングを有効にする。
  config.server_timing = true

  # キャッシュの有効化/無効化。デフォルトではキャッシュは無効です。
  # キャッシュの有効化/無効化を切り替えるには、rails dev:cacheを実行してください。
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.cache_store = :memory_store
    config.public_file_server.headers = { "Cache-Control" => "public, max-age=#{2.days.to_i}" }
  else
    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end

  # アップロードされたファイルをローカルファイルシステムに保存する（オプションはconfig/storage.ymlを参照）。
  config.active_storage.service = :amazon
  # config.active_storage.service = :local

  # メール送信に失敗しても気にしない。
  config.action_mailer.raise_delivery_errors = false

  # アクションコントローラのキャッシュが有効であっても、Action Mailerテンプレートのキャッシュを無効にする。
  config.action_mailer.perform_caching = false

  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  # Railsのロガーに非推奨の警告を出力する。
  config.active_support.deprecation = :log

  # 許可されていない非推奨の警告に対して例外を発生させる。
  config.active_support.disallowed_deprecation = :raise

  # 非推奨の警告メッセージで許可されないものを指定する。
  config.active_support.disallowed_deprecation_warnings = []

  # 保留中のマイグレーションがある場合、ページの読み込み時にエラーを発生させる。
  config.active_record.migration_error = :page_load

  # ログ内のデータベースクエリをトリガーしたコードをハイライト表示する。
  config.active_record.verbose_query_logs = true

  # バックグラウンドジョブをエンキューしたコードをログでハイライト表示する。
  config.active_job.verbose_enqueue_logs = true

  # 翻訳が見つからない場合にエラーを発生させる。
  # config.i18n.raise_on_missing_translations = true

  # レンダリングされたビューにファイル名を注釈する。
  config.action_view.annotate_rendered_view_with_filenames = true

  # 任意のオリジンからのAction Cableアクセスを許可する場合にコメントを外す。
  # config.action_cable.disable_request_forgery_protection = true

  # before_actionのonly/exceptオプションが存在しないアクションを参照している場合にエラーを発生させる。
  config.action_controller.raise_on_missing_callback_actions = true

  # "api"ホスト名を許可
  config.hosts << "api"

  # `bin/rails generate`で生成されたファイルに対してRuboCopによる自動修正を適用する。
  # config.generators.apply_rubocop_autocorrect_after_generate!

  config.action_mailer.delivery_method = :letter_opener_web
  config.action_mailer.perform_deliveries = true
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }

  # アセットパイプラインを有効化
  # config.assets.compile = true


  # config/environments/development.rb
  
  Rails.application.routes.default_url_options[:host] = 'http://localhost:3000'
end
