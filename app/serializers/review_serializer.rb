class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :wine_id, :rating, :review, :username
  
  belongs_to :user
  belongs_to :wine

  def username
    object.user.username
  end
  
end
