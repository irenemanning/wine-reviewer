class CreateWines < ActiveRecord::Migration[7.0]
  def change
    create_table :wines do |t|
      t.string :image_url
      t.string :bottle_name
      t.string :maker
      t.string :region
      t.integer :vintage
      t.string :profile
      t.string :category
      t.string :variety
      t.integer :price

      t.timestamps
    end
  end
end
