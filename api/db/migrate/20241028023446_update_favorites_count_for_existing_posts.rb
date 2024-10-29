class UpdateFavoritesCountForExistingPosts < ActiveRecord::Migration[7.2]
  def up
    Post.where(favorites_count: nil).update_all(favorites_count: 0)
  end

  def down
    Post.update_all(favorites_count: nil)
  end
end
