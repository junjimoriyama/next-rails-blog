# ActiveStorageからS3への接続手順
事前準備
* ActiveStorageの設定
* AWSのアカウント作成

--- AWSのS3の設定 ---
1. バケット作成(ブロックパブリックアクセス設定は全てチェックを外す)
2. バケットのアクセス許可よりバケットポリシーを追加(これがないとアクセスできない。)

例）
```json
{
    // バージョンを指定。
    "Version": "2008-10-17",
    "Statement": [
        {
            // ステートメントのID。ポリシーの各ステートメントに一意のIDを付けて識別するためのもの（任意）。
            "Sid": "PublicReadGetObject",
            // このステートメントの効果。許可する場合は"Allow"、拒否する場合は"Deny"。
            "Effect": "Allow",
            // アクセスを許可する主体。ここでは特定のIAMユーザーを指定。
            "Principal": {
                "AWS": "arn:aws:iam::724772058127:user/next-rails-blog-moriyama"
            },
            // 許可するアクション。S3の操作（例: オブジェクトの取得やアップロード）を指定。
            "Action": [
                "s3:GetObject",  // オブジェクトの読み取りアクセス
                "s3:PutObject"   // オブジェクトの書き込みアクセス
            ],
            // アクションを許可するリソース。特定のS3バケット内のすべてのオブジェクトに適用。
            "Resource": "arn:aws:s3:::next-rails-blog-moriyama/*"
        }
    ]
}
```

--- AWSのIAMの設定 ---
1. ユーザーの作成
  - AWS マネジメントコンソールへのユーザーアクセスを提供するにチェック
  - IAM ユーザーを作成
  - カスタムパスワード設定
2. ユーザーグループを設定
  - 例えばS3ならAmazonS3FullAccessを設定して名前をつけて保存
3. 許可ポリシーを設定
  - 作成したユーザーにユーザーグループで設定したAmazonS3FullAccessをアタッチする
4. アクセスキーを生成
  - セキュリティ認証情報のアクセスキーよりアクセスキーを生成(シークレットアクセスキーと２つできる)


--- railsの設定 ---
1. AWSのアクセスキーとシークレットアクセスキーを設定
  - rails(api)配下で「EDITOR="code --wait" rails credentials:edit」を実行
  - 表示されたファイルにAWSのアクセスキーとシークレットアクセスキーを書き込む
  - ×ボタンで自動で保存
  （dockerだとホストにいないため"code"が認識できずエラーになる）
2. development.rbを編集
  - config.active_storage.service = :local → config.active_storage.service = :amazonに変更
3. storage.ymlにamazonの設定を追記

例）
  ```yml
  amazon:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  region: 'ap-northeast-1'
  bucket: "next-rails-blog-moriyama"（バケットの名前）
  ```

4. aws-sdk-s3をインストール
  - Gemfileにgem "aws-sdk-s3"を加えてバンドルする

  <!-- test1@example.com -->
  <!-- test2@example.com -->