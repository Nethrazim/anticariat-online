class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :name, null: false, limit: 50, index: { unique: false}
      t.string :phone, null: false
      t.string :message, null: false
      
      t.timestamps
    end
  end
end
