class Event < ApplicationRecord
    #has_many :cart_items, dependent: :destroy

    validates :name, :group, :image, :date, :description, :price, presence: true
end