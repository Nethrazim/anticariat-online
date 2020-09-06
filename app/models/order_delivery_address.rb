class OrderDeliveryAddress < ApplicationRecord
    has_one :order
    belongs_to :country
    belongs_to :region

    validates :country_id, :region_id, :address, :city, presence: true
end
