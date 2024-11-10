class User < ApplicationRecord
  #パスワードのハッシュ化
  has_secure_password
  # 1人のユーザーは複数のいいねを持つ。投稿が削除されたらいいねも削除する
  has_many :posts, dependent: :destroy
  # 1人のユーザーは複数の投稿を持つ。ユーザーが削除された投稿も削除する
  has_many :favorites, dependent: :destroy
  # ファイルアップロードが可能
  has_one_attached :avatar

  # ユーザーが「フォローしている関係」を Relationship モデルを通じて管理し、following_idを外部キーとして関連付けています。
  # active_relationshipsはユーザーが「フォローしている関係」を表すアソシエーション
  # フォローする側からhas_manyリレーションシップが伸びる
  has_many :relationships, class_name: "Relationship",foreign_key: :following_id
  has_many :followings, through: :relationships, source: :follower

  # フォローされる側からhas_manyリレーションシップが伸びる
  has_many :reverse_of_relationships, class_name: "Relationship", foreign_key: :follower_id
  has_many :followers, through: :reverse_of_relationships, source: :following


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
