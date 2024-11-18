class User < ApplicationRecord
  #パスワードのハッシュ化
  has_secure_password
  # 1人のユーザーは複数のいいねを持つ。投稿が削除されたらいいねも削除する
  has_many :posts, dependent: :destroy
  # 1人のユーザーは複数の投稿を持つ。ユーザーが削除された投稿も削除する
  has_many :favorites, dependent: :destroy
  # ファイルアップロードが可能
  has_one_attached :avatar, dependent: :purge_later

  # following_idを外部キーとしてrelationshipsと関連づける
  has_many :relationships, foreign_key: :following_id, dependent: :destroy
  # Userインスタンスのfollowingsメソッドを呼び出すと、relationships テーブルを介して follower に関連する User レコードを取得できる
  has_many :followings, through: :relationships, source: :follower

  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: :follower_id, dependent: :destroy
  has_many :followers, through: :reverse_of_relationships, source: :following

  def already_favorited?(post)
    self.favorites.exists?(post_id: post.id)
  end


  # app/controllers/api/v1/users_controller.rb

# def is_followed
#   user = User.find(params[:id])
#   is_followed = user.is_followed_by?(@current_user)
#   render json: { is_followed: is_followed }
# end

  # validate :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
  #
  #
  #②二つのカラムに対してユニークかチェックする場合
  # 例）:latと:lngのカラムの組み合わせでユニークかチェックする場合
  # validates :lat, uniqueness: { scope: :lng }
end

