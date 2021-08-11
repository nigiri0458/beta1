class Api::UserCartitemsController < ApplicationController
    before_action :set_current_user

    def create
        user_cart_item = UserCartitem.new(
            {
                user_id: @@user.id,
                cart_item_id: params[:cart_item_id]
            }
        )
        user_cart_item.save
    end

    def show
        user_cart_item = UserCartitem.where(user_id: @@user.id).to_a
        render json: {
            cart: "cart"#user_cart_item
        }, status: :ok
    end

    def delete
        user_cart_item = UserCartitem.find_by(cart_item_id: params[:cart_item_id])
        user_cart_item.delete
    end
end
