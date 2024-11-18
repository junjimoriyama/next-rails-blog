class ApplicationController < ActionController::API
  include ActionController::Cookies

  def create_token(user_id)
    # JWTのペイロードとしてユーザーIDを含むハッシュを作成
    payload = { user_id: user_id }
    # Railsのcredentialsからシークレットキーを取得
    secret_key = Rails.application.credentials.secret_key_base
    # ペイロードとシークレットキーを使ってJWTトークンを生成し、token変数に格納
    token = JWT.encode(payload, secret_key)
    Rails.logger.info(token)
    # 生成されたトークンを呼び出し元に返す
    return token
  end

  def authenticate
    # Rails.logger.info "authenticateのtokenは: #{token}"
    # token = cookies.signed[:jwt]
    authentication_header = request.headers[:authorization]
    # if token.nil?
    # Authorizationヘッダーが存在しない場合のチェック
    if !authentication_header
      # Authorizationヘッダーがない場合、ログにトークンがないことを出力（token変数はまだ未定義）
      # 認証失敗のレスポンスを返し、処理を終了
      render_unauthorized
    else
      # Authorizationヘッダーがある場合、'Bearer トークン' の形式からトークンを抽出
      token = authentication_header.split(" ")[1]
      # Railsのcredentialsからシークレットキーを取得
      secret_key = Rails.application.credentials.secret_key_base
    end

    begin
      # トークンをデコードしてペイロード（データ部分）を取得
      # JWT.decodeは、トークンをシークレットキーで検証しながらデコードを行う
      # decode_token[0]には、ペイロードが含まれる（ここではユーザーIDが格納されている）
      decode_token = JWT.decode(token, secret_key)

      # デコードしたトークンからユーザーIDを取得し、データベースから該当するユーザーを検索
      # JWTのペイロードには "user_id" が含まれているため、それを使ってユーザーを特定
      @current_user = User.find(decode_token[0]["user_id"])
      # render json: @current_user

      # ユーザーIDに対応するユーザーがデータベースに存在しない場合
    rescue ActiveRecord::RecordNotFound
      render_unauthorized
    rescue JWT::ExpiredSignature
      render json: { error: "トークンの有効期限が切れています" }, status: :unauthorized
      # JWTのデコードに失敗した場合（トークンが無効、改ざん、または期限切れ）
    rescue JWT::DecodeError
      Rails.logger.info your_object.inspect
      render json: { error: "トークンのデコードに失敗しました" }, status: :unauthorized
    end
  end

  def render_unauthorized
    render json: { message: "アクセス許可されていない" }, status: :unauthorized
  end
end

# プロセスの流れ
# ユーザーがログインすると、サーバーはJWTトークンを生成し、それをフロントエンドに返します。
# フロントエンドはそのトークンをクッキーに保存します（cookieStore.set で）。
# 次回以降、リクエストを送信する際、ブラウザは保存していたクッキーのトークンを使い、そのトークンをAuthorizationヘッダーにセットして、サーバーに送信します。
# サーバーはそのAuthorizationヘッダーを使ってトークンを検証し、ユーザーが認証済みかどうかを確認します。


# class ApplicationController < ActionController::API
#   include ActionController::Cookies

#   # JWTトークンを生成
#   def create_token(user_id)
#     payload = {
#       user_id: user_id,
#       exp: 24.hours.from_now.to_i # トークンの有効期限（24時間後）
#     }
#     secret_key = Rails.application.credentials.secret_key_base
#     JWT.encode(payload, secret_key)
#   end

#   # 認証処理
#   def authenticate
#     token = extract_token_from_header

#     if token.blank?
#       render_unauthorized("トークンがありません")
#       return
#     end

#     begin
#       # トークンをデコードしてユーザーを認証
#       decoded_token = decode_token(token)
#       @current_user = User.find(decoded_token["user_id"])
#       Rails.logger.info "現在のユーザー: #{@current_user.inspect}"
#     rescue ActiveRecord::RecordNotFound
#       render_unauthorized("無効なユーザーです")
#     rescue JWT::ExpiredSignature
#       render_unauthorized("トークンの有効期限が切れています")
#     rescue JWT::DecodeError
#       render_unauthorized("トークンのデコードに失敗しました")
#     end
#   end

#   private

#   # Authorizationヘッダーからトークンを抽出
#   def extract_token_from_header
#     auth_header = request.headers['Authorization']
#     auth_header.present? ? auth_header.split(' ').last : nil
#   end

#   # トークンをデコード
#   def decode_token(token)
#     secret_key = Rails.application.credentials.secret_key_base
#     decoded_array = JWT.decode(token, secret_key)
#     decoded_array.first # ペイロード部分を返す
#   end

#   # 認証失敗時のレスポンス
#   def render_unauthorized(message = "アクセス許可されていません")
#     render json: { error: message }, status: :unauthorized
#   end
# end
