class RemoveCartIdColumnFromCartItems < ActiveRecord::Migration[6.1]
  def change
    remove_column :cart_items, :cart_id, :integer
  end
end
