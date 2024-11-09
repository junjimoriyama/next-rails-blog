class Post < ApplicationRecord
  # 1つの投稿は1つのカテゴリーに属する
  belongs_to :category
  # 1つの投稿は1人のユーザーに属する
  belongs_to :user
  # 1つの投稿は複数のいいねを持つ。投稿が削除されたらいいねも削除する
  has_many :favorites, dependent: :destroy
  # ファイルアップロードが可能
  # has_one-attached :image
end

# 画像を保存する用のコードを書く
# has_one_attached