class RemoveCartFromOrder < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :orders, :carts
    remove_reference :orders, :carts, index: true
    remove_column :orders, :cart_id, :integer
  end
end
