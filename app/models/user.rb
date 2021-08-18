class User < ApplicationRecord
    has_secure_password
    has_many :orders, dependent: :destroy
    has_many :user_cart_items, dependent: :destroy

    validates :password, :email, presence: true, on: :create
    validates :password, length: {minimum:8, maximum:16}, on: :create

end