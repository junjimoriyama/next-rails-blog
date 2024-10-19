class Category < ApplicationRecord
  # 1つのカテゴリーは複数の投稿を持つ
  has_many :posts
end
