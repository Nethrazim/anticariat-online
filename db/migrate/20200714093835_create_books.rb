class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string   :author, null: false
      t.string   :title, null: false
      t.string   :publisher
      t.string   :collection
      t.integer  :release_year
      t.integer  :nr_of_pages
      t.string   :format
      t.string   :cover
      t.string   :language
      t.string   :condition
      t.string   :isbn
      t.bigint   :book_category_id, null: false
      t.float  :price, null: false
      t.integer  :quantity, null: false, default: 1 
      t.binary   :base64
      t.timestamps
    end

    add_foreign_key :books, :book_categories
  end
end
