class CartItem < ApplicationRecord
    #belongs_to :cart, optional: true
    #belongs_to :event, optional: true
    has_many :user_cart_items, dependent: :destroy
end
