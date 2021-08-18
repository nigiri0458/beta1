class Api::UserCartItemsController < ApplicationController
    before_action :set_current_user

    def create
        user_cart_item = UserCartItem.new(
            {
                user_id: @@user.id,
                cart_item_id: params[:cart_item_id]
            }
        )
        user_cart_item.save
    end

    def show
        @@cart_item_ids = []
        user_cart_item = UserCartItem.where(user_id: @@user.id)
        total_items = user_cart_item.count
        
        for ids in 0..(total_items - 1) do
            id = user_cart_item[ids].cart_item_id
            @@cart_item_ids.push(id)
        end

        redirect_to controller: :cart_items, action: :show
    end
end
