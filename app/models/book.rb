class Book < ApplicationRecord
    belongs_to :book_category

    validates :author, :title, :price, presence: true
end
