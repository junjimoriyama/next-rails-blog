class RemoveCategoryFromPosts < ActiveRecord::Migration[7.2]
  def change
    remove_column :posts, :category, :string
  end
end
