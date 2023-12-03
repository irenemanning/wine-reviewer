class Wine < ApplicationRecord
    has_many :reviews
    has_many :wusers, through: :reviews

    validates :image_url, presence: true
    validates :maker, presence: true
    # validates :bottle_name, presence: true
    validates :region, presence: true
    validates :vintage, numericality: {less_than_or_equal_to: Date.today.year}
    validates :variety, presence: true
    validates :category, presence: true
    validates :profile, presence: true
    
    validates :price, presence: true
   
end
