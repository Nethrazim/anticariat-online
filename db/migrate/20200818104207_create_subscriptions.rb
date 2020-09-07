class CreateSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :subscriptions do |t|
      t.string :email, null: false, limit: 64, index: {unique: true}
      t.boolean :enabled, null: false, default: true 
      t.timestamps
    end
  end
end
