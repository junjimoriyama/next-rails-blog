class Api::V1::PasswordResetsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])

    if @user.present?
      PasswordResetMailer.with(user: @user).reset.deliver_later
      render json:{message: 'リクエストありがとうございます。パスワードリセットメールを送りました。'}
    else
      render json:{message: 'メールアドレスを見つかりませんでした。ご確認お願いします。'}
    end
  end

  def edit
    @user = User.find_signed!(params[:token], purpose: 'password_reset')
  end

  def update
    if @user.update(password_params)
      render json:{message: 'パスワードをリセットされました。ログインしてください。'}
    else
      render :edit
    end
  end

  def password_params
    
  end
end
