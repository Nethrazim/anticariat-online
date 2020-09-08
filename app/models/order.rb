class Order < ApplicationRecord
    belongs_to :order_delivery_address
    has_many :order_details
    has_many :books, :through => :order_details
    belongs_to :user, required: false
    
    validates :total_price, :quantity, :status, :order_delivery_address_id, presence: true

    accepts_nested_attributes_for :order_details
end
