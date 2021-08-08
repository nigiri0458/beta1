# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_08_072249) do

  create_table "cart_items", force: :cascade do |t|
    t.integer "event_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "quantity"
    t.index ["event_id"], name: "index_cart_items_on_event_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.string "group", null: false
    t.string "image", null: false
    t.date "date", null: false
    t.text "description", null: false
    t.text "info"
    t.integer "price", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "order_cart_items", force: :cascade do |t|
    t.integer "order_id", null: false
    t.integer "cart_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cart_item_id"], name: "index_order_cart_items_on_cart_item_id"
    t.index ["order_id"], name: "index_order_cart_items_on_order_id"
  end

  create_table "orders", force: :cascade do |t|
    t.boolean "isPurchased", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "user_cart_items", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "cart_item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cart_item_id"], name: "index_user_cart_items_on_cart_item_id"
    t.index ["user_id"], name: "index_user_cart_items_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "cart_items", "events"
  add_foreign_key "order_cart_items", "cart_items"
  add_foreign_key "order_cart_items", "orders"
  add_foreign_key "orders", "users"
  add_foreign_key "user_cart_items", "cart_items"
  add_foreign_key "user_cart_items", "users"
end
