class Review < ApplicationRecord
    belongs_to :wuser
    belongs_to :wine

    validates :rating, presence: true
    validates :rating, numericality: {
        greater_than_or_equal_to: 1,
        less_than_or_equal_to: 5
      }
    validates :review, presence: true
    
end
