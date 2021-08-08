class CartItem < ApplicationRecord
    belongs_to :event, optional: true
    has_many :users, through: :user_cart_items
    has_may :user_cart_items
    has_many :orders, through: :order_cart_items
    has_many :order_cart_items
end
