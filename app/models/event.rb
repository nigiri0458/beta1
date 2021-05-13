class Event < ApplicationRecord
    has_many :cart_items

    validates :name, :group, :image, :date, :description, :price, presence: true
end