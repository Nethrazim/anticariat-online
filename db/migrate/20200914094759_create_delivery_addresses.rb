class CreateDeliveryAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :delivery_addresses do |t|
      t.string :address, null: false, limit:254
      t.string :city, null: false, limit: 50
      t.bigint :country_id, null: false
      t.bigint :region_id, null: false
      t.bigint :user_id, null: false
      t.timestamps
    end

    add_foreign_key :delivery_addresses, :users
    add_foreign_key :delivery_addresses, :countries
    add_foreign_key :delivery_addresses, :regions
  end
end
