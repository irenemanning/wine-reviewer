class Wuser < ApplicationRecord
    has_many :reviews
    has_many :wines, through: :reviews
    has_secure_password

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
