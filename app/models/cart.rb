class Cart < ApplicationRecord
    belongs_to :user
    has_many :events
    has_one :order

    validates :id, :user_id, presence :true
end