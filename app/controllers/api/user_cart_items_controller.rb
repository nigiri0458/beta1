class Api::UserCartItemsController < ApplicationController
    before_action :set_current_user

    def purchase
        cart_item = UserCartItem.where(user_id: @@user.id)
        puts cart_item
        order = Order.new(
            {
                user_id: @@user.id,
                isPurchased: false
            }
        )
        if order.save
            for item in cart_item do
                order_cart_item = OrderCartItem.new(
                    {
                        order_id: order.id,
                        cart_item_id: item.id
                    }
                )
                if order_cart_item.save
                    puts order_cart_item.order_id
                    user_cart_item = UserCartItem.find_by(cart_item_id: item.id)
                    if user_cart_item.destroy
                        if item.destory
                            render json: {status: 'cart_item destroyed'}, status: :ok
                        else
                            render json: {error: 'failed to destroy cart_item'}, status: :internal_server_error
                        end
                    else
                        render json: {error: 'failed to destroy user_cart_item'}, status: :internal_server_error
                    end
                else
                    render json: {error: 'failed to save an order_cart_item'}, status: :internal_server_error
                end
            end
        end
    end

end
