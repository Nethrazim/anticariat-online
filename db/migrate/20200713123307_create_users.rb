class CreateUsers < ActiveRecord::Migration[6.0]  
  def change
    create_table :users do |t|
      t.string :username, null: false, limit:50, index: { unique: true }
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :email, null: false, limit: 64, index: { unique: true }
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end
