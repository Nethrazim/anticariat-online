class CreatePriceReductions < ActiveRecord::Migration[6.0]
  def change
    create_table :price_reductions do |t|
      t.float  :percent_reduction, null: false
      t.bigint :book_id, null: false
      t.timestamps
    end

    add_foreign_key :price_reductions, :books 
  end
end
