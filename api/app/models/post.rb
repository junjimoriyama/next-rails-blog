class Post < ApplicationRecord
  # 1つの投稿は1つのカテゴリーに属する
  belongs_to :category
  # 1つの投稿は1人のユーザーに属する
  belongs_to :user
end
