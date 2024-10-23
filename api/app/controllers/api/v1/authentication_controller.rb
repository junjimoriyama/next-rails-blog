class Api::V1::AuthenticationController < ApplicationController
  before_action :authenticate_user, only: [:authenticate]  # 認証が必要なアクションに適用

  # ログイン時の認証
  def login
    @user = User.find_by(email: params[:user][:email])
    if @user.nil?
      render json: { message: '一致しません' }, status: :not_found
    elsif !@user&.authenticate(params[:user][:password])  # スペースを削除
      render json: { message: '存在しません' }, status: :unauthorized
    else
      token = create_token(@user.id)

      # クッキーにトークンを設定
      # cookies.signed[:jwt] = { value: token, httponly: true, secure: Rails.env.production? }

      render json: { email: @user.email, token: token }, status: :ok
    end
  end

  def authenticate
    authentication_header = request.headers[:authorization]
    if !authentication_header
      render_unauthorized
    else
      token = authentication_header.split(' ')[1]  
      secret_key = Rails.application.credentials.secret_key_base
    end

    begin
      decode_token = JWT.decode(token, secret_key)
      # decode_token[0]はpayload。['user_id'] に修正
      @current_user = User.find(decode_token[0]['user_id'])

      Rails.logger.info "Current User: #{@current_user.inspect}"

    rescue ActiveRecord::RecordNotFound
      render_unauthorized
    rescue JWT::DecodeError
      render_unauthorized
    end
  end

  def render_unauthorized
    render json: { message: 'アクセス許可されていない' }, status: :unauthorized
  end

  private

  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.credentials.secret_key_base
    JWT.encode(payload, secret_key)
  end
end

# ユーザーがログインを試みると、サーバーはユーザーを検索し、認証が成功すれば JWT トークンを発行します。
# クライアントはこのトークンを保存し、次のリクエストで Authorization ヘッダーにトークンを含めて送信します。
# サーバーは受け取ったトークンを検証し、正しいトークンならユーザーを認証します。





























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