class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :user_id
      t.integer :wine_id
      t.integer :rating
      t.text :opinion

      t.timestamps
    end
  end
end
