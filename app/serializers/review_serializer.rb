class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :wine_id, :rating, :opinion
end
