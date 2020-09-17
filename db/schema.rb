# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_17_110746) do

  create_table "book_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_book_categories_on_name", unique: true
  end

  create_table "books", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "author", null: false
    t.string "title", null: false
    t.string "publisher"
    t.string "collection"
    t.integer "release_year"
    t.integer "nr_of_pages"
    t.string "format"
    t.string "cover"
    t.string "language"
    t.string "condition"
    t.string "isbn"
    t.bigint "book_category_id", null: false
    t.float "price", null: false
    t.integer "quantity", default: 1, null: false
    t.binary "base64"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_category_id"], name: "fk_rails_baf60e0099"
  end

  create_table "countries", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "delivery_addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "address", limit: 254, null: false
    t.string "city", limit: 50, null: false
    t.bigint "country_id", null: false
    t.bigint "region_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "fk_rails_aade3f55cc"
    t.index ["region_id"], name: "fk_rails_883c073211"
    t.index ["user_id"], name: "fk_rails_42675d2d6f"
  end

  create_table "messages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", limit: 50, null: false
    t.string "phone", null: false
    t.string "message", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_messages_on_name"
  end

  create_table "order_delivery_addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "country_id", null: false
    t.bigint "region_id", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "fk_rails_eec40286c5"
    t.index ["region_id"], name: "fk_rails_ed49d5f34e"
  end

  create_table "order_details", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "order_id", null: false
    t.bigint "book_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "fk_rails_e525c877ba"
    t.index ["order_id"], name: "fk_rails_e5976611fd"
  end

  create_table "orders", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.float "total_price", null: false
    t.integer "quantity", null: false
    t.string "status", null: false
    t.string "comment"
    t.bigint "order_delivery_address_id", null: false
    t.bigint "user_id"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_delivery_address_id"], name: "fk_rails_0bf37905ca"
    t.index ["user_id"], name: "fk_rails_f868b47f6a"
  end

  create_table "price_reductions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.float "percent_reduction", null: false
    t.bigint "book_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "fk_rails_7aecd0db53"
  end

  create_table "regions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "country_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "fk_rails_f2ba72ccee"
  end

  create_table "subscriptions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", limit: 64, null: false
    t.boolean "enabled", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_subscriptions_on_email", unique: true
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "username", limit: 50, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.string "email", limit: 64, null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "books", "book_categories"
  add_foreign_key "delivery_addresses", "countries"
  add_foreign_key "delivery_addresses", "regions"
  add_foreign_key "delivery_addresses", "users"
  add_foreign_key "order_delivery_addresses", "countries"
  add_foreign_key "order_delivery_addresses", "regions"
  add_foreign_key "order_details", "books"
  add_foreign_key "order_details", "orders"
  add_foreign_key "orders", "order_delivery_addresses"
  add_foreign_key "orders", "users"
  add_foreign_key "price_reductions", "books"
  add_foreign_key "regions", "countries"
end
