class UserCartItem < ApplicationRecord
  belongs_to :user
  belongs_to :cart_item
end
