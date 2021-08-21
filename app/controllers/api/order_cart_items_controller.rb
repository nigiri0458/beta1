class Api::OrderCartItemsController < ApplicationController
    before_action :set_current_user
    
    def create
        for index in 0..(@@cart_item_ids.count - 1) do
            order_cart_item = OrderCartItem.new(
                {
                    order_id: @@order.id,
                    cart_item_id: @@cart_item_ids[index].id
                }
            )
            order_cart_item.save
        end
        render json: {status: 'order_cart_items created'}, status: :ok
    end
end
