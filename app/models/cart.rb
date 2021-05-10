class Cart < ApplicationRecord
    belongs_to :user
    has_many :events
    has_one :order
    has_many :cart_items

    validates :id, :user_id, presence :true
end