class RemoveCartIdFromCartItems < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :cart_items, :carts
    remove_reference :cart_items, :carts, index: true
  end
end
