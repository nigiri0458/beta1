class OrderCartItem < ApplicationRecord
    belongs_to :order, optional: true
    belongs_to :cart_item, optional: true
end