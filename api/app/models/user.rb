class User < ApplicationRecord
  #パスワードのハッシュ化
  has_secure_password
  # 1人のユーザーは複数のいいねを持つ。投稿が削除されたらいいねも削除する
  has_many :posts, dependent: :destroy
  # 1人のユーザーは複数の投稿を持つ。ユーザーが削除された投稿も削除する
  has_many :favorites, dependent: :destroy

  def already_favorited?(post)
    self.favorites.exists?(post_id: post.id)
  end

  # validate :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
  #
  #
  #②二つのカラムに対してユニークかチェックする場合
  # 例）:latと:lngのカラムの組み合わせでユニークかチェックする場合
  # validates :lat, uniqueness: { scope: :lng }
end
