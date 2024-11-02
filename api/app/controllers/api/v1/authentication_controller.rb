class Api::V1::AuthenticationController < ApplicationController

  # ログイン時の認証
  def login
    @user = User.find_by(email: params[:user][:email])
    if @user&.authenticate(params[:user][:password])
      token = create_token(@user.id)
      Rails.logger.info "token: #{token}"
      render json: { user: { email: @user.email, token: token } }
    else
      render status: :unauthorized
    end
  end
end

# ここでパスワードリセット用のコードを書く

# def login
#   @user = User.find_by(email: params[:user][:email])
#   if @user.nil?
#     render json: { message: '一致しません' }, status: :not_found
#   elsif !@user&.authenticate(params[:user][:password])  # スペースを削除
#     render json: { message: '存在しません' }, status: :unauthorized
#   else
#     # ユーザーのIDを元にJWTトークンを生成し、token変数に格納する
#     # このトークンは後のリクエストで認証を行うために使用される
#     token = create_token(@user.id)
#     Rails.logger.info "token: #{token}"

#     # クッキーにトークンを設定
#     # cookies.signed[:jwt] = { value: token, httponly: true, secure: false, same_site: :lax }
#     # クッキーの内容をログに出力
#     # Rails.logger.info "JWTクッキーに保存された値: #{cookies.signed[:jwt]}"

#     render json: { email: @user.email, token: token }, status: :ok
#   end
# end

# private
# def create_token(user_id)
#   payload = { user_id: user_id }
#   secret_key = Rails.application.credentials.secret_key_base
#   JWT.encode(payload, secret_key)
# end

# ユーザーがログインを試みると、サーバーはユーザーを検索し、認証が成功すれば JWT トークンを発行します。
# クライアントはこのトークンを保存し、次のリクエストで Authorization ヘッダーにトークンを含めて送信します。
# サーバーは受け取ったトークンを検証し、正しいトークンならユーザーを認証します。

# class Api::V1::AuthenticationController < ApplicationController
#   # ログイン時の認証
#   def login
#     @user = User.find_by(email: params[:user][:email])

#     if @user.nil?
#       render json: { message: '一致しません' }, status: :not_found
#     elsif !@user&.authenticate(params[:user][:password])  # パスワード一致確認
#       render json: { message: '存在しません' }, status: :unauthorized
#     else
#       token = create_token(@user.id)

#       # クッキーにトークンを設定
#       cookies.signed[:jwt] = cookie_token(token)

#       # クッキーの内容をログに出力
#       Rails.logger.info "JWTクッキーに保存された値: #{cookies.signed[:jwt]}"

#       render json: { email: @user.email, token: token }, status: :ok
#     end
#   end

#   private

#   # トークンを作成するメソッド
#   def create_token(user_id)
#     payload = { user_id: user_id }
#     secret_key = Rails.application.credentials.secret_key_base
#     JWT.encode(payload, secret_key)
#   end

#   # クッキーに保存するトークン設定
#   def cookie_token(token)
#     decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
#     exp = decoded_token[0]["exp"] # トークンの有効期限

#     {
#       value: token,
#       expires: Time.at(exp),
#       secure: Rails.env.production?,
#       http_only: true,
#       same_site: :lax
#     }
#   end
# end

# 認証に成功したユーザーの一意のIDを使って、JWT（JSON Web Token）のペイロード（トークン内のデータ）を生成する

# class Api::V1::AuthenticationController < ApplicationController
#   def login
#     user = User.find_by(email: params[:email])
#     if user&.authenticate(params[:password])
#       token = create_token(user.id)
#       render json: { token: token }, status: :ok
#     else
#       render json: { error: 'Invalid email or password' }, status: :unauthorized
#     end
#   end

#   private
#   def create_token(user_id)
#     payload = { user_id: user_id }
#     secret_key = Rails.application.credentials.secret_key_base
#     JWT.encode(payload, secret_key)
#   end
# end

# def login
#   @user = User.find_by(email: params[:user][:email])

#   if @user.nil?
#     render json: { message: 'ユーザーが見つかりません' }, status: :not_found
#   elsif !@user.authenticate(params[:user][:password])
#     render json: { message: 'パスワードが一致しません' }, status: :unauthorized
#   else
#     token = create_token(@user.id)  # @user.id を使う
#     render json: { token: token }, status: :ok
#   end
# end

# def login
#   # 存在しない、一致しない、成功する
#   @user = User.find_by(email: params[:user][:email])
#   if @user.nil?
#     render json: {message: '存在しない'}, status: :not_found
#   elsif
#     @user&.authenticate(params[:user][:password])
#     render json: {message: '一致しない'}, status: :unprocessable_entity
#   else
#     token = create_token(user.id)
#     render json: {email: @user.email, token: token}, status: :ok
#   end
# end

# private
# def create_token(user_id)
#   #  user_id は、ユーザーを一意に識別するための値
#   payload = {user_id: user_id}
#   # secret_key
#   secret_key = Rails.application.credentials.secret_key_base
#   # JWT
#   JWT.encode(payload, secret_key)
# end
