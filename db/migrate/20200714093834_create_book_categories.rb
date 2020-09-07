class CreateBookCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :book_categories do |t|
      t.string :name, null: false, limit:50, index: { unique: true }
      t.timestamps
    end
  end
end
