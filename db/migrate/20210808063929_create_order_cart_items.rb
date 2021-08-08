class CreateOrderCartItems < ActiveRecord::Migration[6.1]
  def change
    create_table :order_cart_items do |t|
      t.references :order, null: false, foreign_key: true
      t.references :cart_item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
