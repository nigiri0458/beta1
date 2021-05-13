class Cart < ApplicationRecord
    belongs_to :user, optional: true
    has_one :order
    has_many :cart_items

    validates :user_id, presence: true
end