class CreateWineReviewerTables < ActiveRecord::Migration[7.0]
  def change
    create_table :wusers do |t|
      t.string :username
      t.string :password_digest
      t.string :image_url
      t.timestamps
    end

    create_table :wines do |t|
      t.string :image_url
      t.string :bottle_name
      t.string :maker
      t.string :region
      t.integer :vintage
      t.string :profile
      t.string :category
      t.string :variety
      t.decimal :price, precision: 10, scale: 2
      t.timestamps
    end

    create_table :reviews do |t|
      t.integer :wuser_id
      t.integer :wine_id
      t.integer :rating
      t.text :review
      t.timestamps
    end

    add_foreign_key :reviews, :wusers, column: :wuser_id
    add_foreign_key :reviews, :wines, column: :wine_id
  end
end