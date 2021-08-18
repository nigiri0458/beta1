class Order < ApplicationRecord
    has_many :order_cart_items, optional: true, dependent: :destroy
    belongs_to :user, optional: true, dependent: :destroy

    validates :is_purchased, presence: true
end