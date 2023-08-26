class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :wine_id, :rating, :review
  
  belongs_to :user
  belongs_to :wine
end
