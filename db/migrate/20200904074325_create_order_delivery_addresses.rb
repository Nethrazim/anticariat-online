class CreateOrderDeliveryAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :order_delivery_addresses do |t|
      t.bigint :country_id, null: false
      t.bigint :region_id, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.timestamps
    end

    add_foreign_key :order_delivery_addresses, :countries
    add_foreign_key :order_delivery_addresses, :regions
  end
end
