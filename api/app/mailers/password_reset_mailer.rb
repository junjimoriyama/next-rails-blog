class PasswordResetMailer < ApplicationMailer
  # パスワードリセットメールを生成し、ユーザーに送信する
  def reset
    @user = params[:user]
    @token = params[:user].signed_id(purpose: 'password_reset', expires_in: 15.minutes)

    Rails.logger.info "resetメソッドのトークンは#{@token}"
    Rails.logger.info "resetメソッドの秘密鍵は#{Rails.application.credentials.secret_key_base}"
    
    mail to: @user.email, subject: 'パスワードリセット申請ありがとうございます'
  end
end


# resetメソッドのトークンはeyJfcmFpbHMiOnsiZGF0YSI6MSwicHVyIjoidXNlci9wYXNzd29yZF9yZXNldCJ9fQ--6f8bcf6516c5eacb1ab68eb414ac553abceeed97a488fc9901c3c77e17f08be3
# resetメソッドの秘密鍵はf458f1a4e088c00a5994989b02162025130c7b9ee696a0856629be0b9b73f81a7991d5fe9dbbd79d98fe0566cceb5ae92aa3ec7a78148b65bf128ff02c5b0e9e
# 
#updateメソッドのトークンは
# eyJfcmFpbHMiOnsiZGF0YSI6MSwicHVyIjoidXNlci9wYXNzd29yZF9yZXNldCJ9fQ--6f8bcf6516c5eacb1ab68eb414ac553abceeed97a488fc9901c3c77e17f08be3

# resetメソッドの秘密鍵はf458f1a4e088c00a5994989b02162025130c7b9ee696a0856629be0b9b73f81a7991d5fe9dbbd79d98fe0566cceb5ae92aa3ec7a78148b65bf128ff02c5b0e9e