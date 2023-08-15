class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :wine_id, :rating, :opinion
  
  belongs_to :user
  belongs_to :wine
end
