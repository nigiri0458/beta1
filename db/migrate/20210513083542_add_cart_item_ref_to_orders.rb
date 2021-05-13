class AddCartItemRefToOrders < ActiveRecord::Migration[6.1]
  def change
    add_reference :orders, :cart_item, foreign_key: true
  end
end
