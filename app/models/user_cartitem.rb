class OrderCartItem < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :cart_item, optional: true
end