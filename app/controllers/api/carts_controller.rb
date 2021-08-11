class Api::CartsController < ApplicationController
    before_action :user_authentication

    # Userのカートページを表示
    def index
        cart = Cart.find_by(user_id: @@user.id)

        render json: {
            cart: cart
        }, status: :ok
    end

end
