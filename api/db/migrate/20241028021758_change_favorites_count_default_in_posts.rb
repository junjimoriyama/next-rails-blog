class ChangeFavoritesCountDefaultInPosts < ActiveRecord::Migration[7.2]
  def change
    change_column_default :posts, :favorites_count, from: nil, to: 0
  end
end
