class Order < ApplicationRecord
    belongs_to :cart
    belongs_to :order_history

    validates :id, :cart_id, :is_purchased, presence :true
end