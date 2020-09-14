class DeliveryAddress < ApplicationRecord
    belongs_to :country
    belongs_to :region
    belongs_to :user

    validates :country_id, :region_id, :user, :address, :city, presence: true
end
