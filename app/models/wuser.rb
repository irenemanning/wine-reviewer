class Wuser < ApplicationRecord
    has_one_attached :profile_image
    has_many :reviews
    has_many :wines, through: :reviews

    validates :username, presence: true
    validates_uniqueness_of :username, scope: :id, allow_nil: true, if: :new_record?

    has_secure_password

    validate :profile_image_validations, if: :profile_image_required?
    
private

    def password_required?
        if profile_image.attached? && !new_record? && !changes[:password].present? && !changes[:password_confirmation].present?
        return false
        end
        new_record? || changes[:password].present? || changes[:password_confirmation].present?
    end
 
    def profile_image_required?
        new_record? || changes[:profile_image].present?
    end
    def profile_image_validations
        return unless profile_image.attached?
        errors.add(:profile_image, "is too large") if profile_image.blob.byte_size > 5.megabytes
    end
end
