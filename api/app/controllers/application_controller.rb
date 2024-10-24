class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate
    Rails.logger.info "authenticate メソッドが呼び出されました"
    token = cookies.signed[:jwt] 
    # authentication_header = request.headers[:authorization]
    # デバッグ用に authentication_header の内容をログに出力
    Rails.logger.info "Authorizationヘッダーの内容: #{authentication_header}"

    if token.nil?
    # if !authentication_header
      render_unauthorized
      return
    else
      token = authentication_header.split(' ')[1]  
      secret_key = Rails.application.credentials.secret_key_base
    end

    begin
      decode_token = JWT.decode(token, secret_key)
      # decode_token[0]はpayload。['user_id'] に修正
      @current_user = User.find(decode_token[0]['user_id'])

      Rails.logger.info "現在のユーザーは: #{@current_user.inspect}"

    rescue ActiveRecord::RecordNotFound
      render_unauthorized
    rescue JWT::DecodeError
      render_unauthorized
    end
  end

  def render_unauthorized
    render json: { message: 'アクセス許可されていない' }, status: :unauthorized
  end

end

 