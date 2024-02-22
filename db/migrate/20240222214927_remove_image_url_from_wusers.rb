class RemoveImageUrlFromWusers < ActiveRecord::Migration[7.0]
  def change
    remove_column :wusers, :image_url, :string
  end
end
