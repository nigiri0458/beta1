class Order < ApplicationRecord
    belongs_to :cart, optional: true
    belongs_to :order_history, optional: true

    validates :cart_id, :is_purchased, presence: true
end