class OrderCartItem < ApplicationRecord
  belongs_to :order
  belongs_to :cart_item
end
