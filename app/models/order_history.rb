class OrderHistory < ApplicationRecord
    belongs_to :user, optional: true
    has_many :orders

    validates :user_id, presence: true
end