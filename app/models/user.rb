class User < ApplicationRecord
    has_many :reviews
    has_many :added_wines, through: :reviews, source: :wine
    has_secure_password
    validates :username, presence: true, uniqueness: true
end
