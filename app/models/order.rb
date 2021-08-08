class Order < ApplicationRecord
    has_many :cart_items, through: :order_cart_items
    has_many :order_cart_items
end