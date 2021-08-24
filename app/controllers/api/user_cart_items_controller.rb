class Api::UserCartItemsController < ApplicationController
    before_action :set_current_user

    def purchase
        user_cart_item = UserCartItem.where(user_id: @@user.id)
        order = Order.new({
            isPurchased: false,
            user_id: @@user.id
        })

        if order.save!
            for item in user_cart_item do
                order_cart_item = OrderCartItem.new(
                    {
                        order_id: order.id,
                        cart_item_id: item.cart_item_id
                    }
                )
                if order_cart_item.save!
                    cart_item = CartItem.find(item.cart_item_id)
                    if cart_item
                        if cart_item.destroy
                            user_cart_reference = UserCartItem.find(item.id)
                            if user_cart_reference.destroy
                                render json: {status: 'cart_item destroyed'}, status: :ok
                            else
                                render json: {error: 'failed to delete user_cart_item'}, status: :internal_server_error
                            end
                        else
                            render json: {error: 'failed to delete cart item'}, status: :internal_server_error
                        end
                    else
                        render json: {error: 'failed to find cart item'}, status: :internal_server_error
                    end
                else
                    render json: {error: 'failed to save an order_cart_item'}, status: :internal_server_error
                end
            end
        else
            render json: {error: 'failed to save order'}, status: :internal_server_error
        end
    end

end
