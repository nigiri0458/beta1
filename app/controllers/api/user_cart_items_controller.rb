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

    def purchase
        @@cart_item_ids = []
        cart_item = UserCartItem.where(user_id: @@user.id)
        total_items = cart_item.count
        for i in 0..(total_items - 1) do
            id = cart_item[i].cart_item_id
            @@cart_item_ids.push(id)
        end

        user_cart_item = UserCartItem.where(user_id: @@user.id)
        if user_cart_item.destroy
            redirect_to controller: :orders, action: :create
        else
            render json: {error: 'error in user_cart_items#purchase'}, status: :internal_server_error
        end
    end


end
