class CreateOrderDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :order_details do |t|
      t.bigint :order_id, null: false
      t.bigint :book_id, null: false
      t.timestamps
    end

    add_foreign_key :order_details, :books
    add_foreign_key :order_details, :orders
  end
end
