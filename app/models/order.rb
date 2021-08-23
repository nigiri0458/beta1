class Order < ApplicationRecord
    has_many :order_cart_items, dependent: :destroy
    belongs_to :user, optional: true

    validates :isPurchased, presence: true
end