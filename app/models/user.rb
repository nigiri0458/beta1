class User < ApplicationRecord
    has_secure_password
    has_one :cart
    has_one :order_history

    validates :password, :email, presence: true
    validates :password, length: {minimum:8, maximum:16}

end