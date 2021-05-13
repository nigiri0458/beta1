class CartItem < ApplicationRecord
    belongs_to :cart, optional: true
    belongs_to :event, optional: true
    belongs_to :cart_item, optional: true
end
