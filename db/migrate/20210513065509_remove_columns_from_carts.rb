class RemoveColumnsFromCarts < ActiveRecord::Migration[6.1]
  def change
    remove_foreign_key :carts, :events
    remove_reference :carts, :event, index: true
  end
end
