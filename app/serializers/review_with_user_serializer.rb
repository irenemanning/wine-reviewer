class ReviewWithUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :username, :rating, :review

  def username
    object.user.username
  end
end
