class RemoveTables < ActiveRecord::Migration[6.1]
  def change
    drop_table :carts
    drop_table :order_histories
  end
end
