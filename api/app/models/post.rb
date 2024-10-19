class Post < ApplicationRecord
  # 1つの投稿は1つのカテゴリーに属する
  belongs_to :category
end
