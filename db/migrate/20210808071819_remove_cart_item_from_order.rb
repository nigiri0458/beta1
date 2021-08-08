class RemoveCartItemFromOrder < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :orders, :cart_items
    remove_reference :orders, :cart_items, index: true
    remove_column :orders, :cart_item_id, :integer
  end
end
