class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      
      t.float   :total_price, null: false
      t.integer :quantity, null: false
      t.string  :status, null: false
      t.string  :comment, null: true
      t.bigint  :order_delivery_address_id, null: false
      t.bigint  :user_id, null: true
      t.string  :first_name
      t.string  :last_name
      t.string  :email
      t.string  :phone
      t.timestamps
    end

    add_foreign_key :orders, :order_delivery_addresses
    add_foreign_key :orders, :users
  end
end
