class CreateRegions < ActiveRecord::Migration[6.0]
  def change
    create_table :regions do |t|
      t.string :name, null: false
      t.bigint :country_id, null: false
      t.timestamps
    end

    add_foreign_key :regions, :countries
  end
end
