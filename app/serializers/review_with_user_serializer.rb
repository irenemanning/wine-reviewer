class ReviewWithUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :username, :rating, :opinion

  def username
    object.user.username
  end
end
