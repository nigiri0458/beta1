class Order < ApplicationRecord
    belongs_to :cart, optional: true
    belongs_to :order_history, optional: true
    has_many :cart_items

    validates :cart_id, :is_purchased, presence: true
end