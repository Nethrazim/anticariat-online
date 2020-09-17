class Book < ApplicationRecord
    belongs_to :book_category
    has_one :price_reduction
    
    validates :author, :title, :price, :book_category_id, presence: true
end
