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
                    user_cart_reference = UserCartItem.find(item.id)
                    if user_cart_reference.destroy!
                        puts "user_cart_item destroyed"
                    else
                        puts "user_cart_item destroy failed"
                    end
                else
                    puts "order_cart_item save failed"
                end
            end
        else
            render json: {error: 'failed to save order'}, status: :internal_server_error
        end
    end

end
