class RenameOpinionsToReview < ActiveRecord::Migration[7.0]
  def change
    rename_column :reviews, :opinion, :review
  end
end
