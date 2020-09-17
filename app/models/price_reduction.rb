class PriceReduction < ApplicationRecord
    belongs_to :book

    validates :percent_reduction, :book_id, presence: true
end
