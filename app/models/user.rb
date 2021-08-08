class User < ApplicationRecord
    has_secure_password
    has_many :cart_items, through: :user_cart_items
    has_many :user_cart_items

    validates :password, :email, presence: true, on: :create
    validates :password, length: {minimum:8, maximum:16}, on: :create
end