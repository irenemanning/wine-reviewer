class WineSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :bottle_name, :maker, :region, :vintage, :profile, :category, :variety, :price
end
