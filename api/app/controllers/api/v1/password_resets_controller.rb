class Api::V1::PasswordResetsController < ApplicationController
  def new
  end

  def create
    # リクエストで送られてきたemailがUserテーブルにあるか確認
    @user = User.find_by(email: params[:email])

    if @user.present?
      # user: @userはPasswordResetMailerへparamsとして渡される
      PasswordResetMailer.with(user: @user).reset.deliver_later
      render json:{message: 'リクエストありがとうございます。パスワードリセットメールを送りました。'}
    else
      render json:{message: 'メールアドレスを見つかりませんでした。ご確認お願いします。'}
    end
  end  

  # def edit
  #   Rails.logger.info "editアクションが呼ばれました。"
  #   @user = User.find_signed!(params[:token], purpose: 'password_reset')
  #   Rails.logger.info "editの部分にある #{@user}"
  #     if @user.present?
  #       render json: { message: 'トークン有効です。パスワード再設定ページへ進んでください。' }, status: :ok
  #     else
  #       render json: { error: 'トークンが無効か、期限切れです。' }, status: :unprocessable_entity
  #     end
  # end

  def update
    begin
      @user = User.find_signed!(params[:token], purpose: 'password_reset')
      Rails.logger.info "アップデート処理時のユーザー: #{@user}"
    rescue => e
      Rails.logger.error "アップデート失敗: #{e.message}"
      return render json: { error: "Invalid or expired token" }, status: :unprocessable_entity
    end
  
    if @user.update(password: params[:password])
      render json: { message: 'パスワードが変更されました。ログインしてください。' }
    else
      render json: { error: "Failed to update password" }, status: :unprocessable_entity
    end
  end
  
  

  def password_params
    params.require(:password)
  end
end
