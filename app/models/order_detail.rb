class OrderDetail < ApplicationRecord
    belongs_to :order
    belongs_to :book

    validates :order, :book_id, presence: true
end
