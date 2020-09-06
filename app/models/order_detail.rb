class OrderDetail < ApplicationRecord
    belongs_to :order
    has_one :book

    validates :order, :book_id, presence: true
end
