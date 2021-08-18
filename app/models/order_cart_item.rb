class OrderCartItem < ApplicationRecord
    belongs_to :order, optional: true, dependent: :destroy
    belongs_to :cart_item, optional: true, dependent: :destroy
end