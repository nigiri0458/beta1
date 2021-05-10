class Event < ApplicationRecord
    belongs_to :cart

    validates :id, :name, :group, :image, :date, :description, :fee, presence :true
end