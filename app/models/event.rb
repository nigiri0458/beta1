class Event < ApplicationRecord
    belongs_to :cart, optional: true

    validates :name, :group, :image, :date, :description, :price, presence: true
end