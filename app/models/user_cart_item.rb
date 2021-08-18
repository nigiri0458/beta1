class UserCartItem < ApplicationRecord
    belongs_to :user, optional: true, dependent: :destroy
    belongs_to :cart_item, optional: true, dependent: :destroy
end