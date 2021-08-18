class OrderHistory < ApplicationRecord
    belongs_to :user, optional: true, dependent: :destroy
    has_many :orders, dependent: :destroy

    validates :user_id, presence: true
end