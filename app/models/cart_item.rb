class CartItem < ApplicationRecord
    belongs_to :cart, optional: true
    belongs_to :event, optional: true, dependent: :destroy
end
