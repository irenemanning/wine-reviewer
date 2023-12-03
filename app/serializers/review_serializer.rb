class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :wine_id, :rating, :review, :username
  
  belongs_to :wuser
  belongs_to :wine

  def username
    object.wuser.username
  end
  
end
