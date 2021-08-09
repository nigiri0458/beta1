class Order < ApplicationRecord
    has_many :order_cart_items, optional: true
    belongs_to :user, optional: true

    validates :is_purchased, presence: true
end