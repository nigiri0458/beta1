class Api::CartItemsController < ApplicationController
    before_action :set_current_user

    def show
        user_cart_items = UserCartItem.where(user_id: @@user.id)
        cart = []
        total_price = 0
        for items in user_cart_items do
            cart_item = CartItem.find(items.cart_item_id)
            event = Event.find(cart_item.event_id)
            total_price += (event.price * cart_item.quantity)
            cart.push({"cart_item_id" => cart_item.id, "event_id" => event.id, "event_name" => event.name, "event_image" => event.image, "quantity" => cart_item.quantity, "price" => event.price })
        end
        render json: {cart: cart, total_price: total_price}, status: :ok
    end

    # フロントから event_id と　quantity を受けとり、CartItemを作成
    def create
        cart_item = CartItem.new(
            event_id: params[:event_id],
            quantity: params[:quantity]
        )

        if cart_item.save
            user_cart_item = UserCartItem.new(
                cart_item_id: cart_item.id,
                user_id: @@user.id
            )
            if user_cart_item.save
                old = Event.find(params[:event_id]).stock
                Event.find(params[:event_id]).update(stock: old - params[:quantity])
            else
                render json: {error: "user_cart_item.save"}, status: :internal_server_error
            end

        else
            render json: {error: "cart_item.save"}, status: :internal_server_error
        end
    end

    # フロントから new_quantity を受け取り、更新
    def change_quantity
        cart_item = CartItem.find(params[:cart_item_id])
        cart_item.update(quantity: params[:new_quantity])
        render plain: "OK!!!"
    end

    # フロントから指示されたアイテムを削除
    def delete
        cart_item = CartItem.find(params[:cart_item_id])
        if cart_item
            if cart_item.destroy
                redirect_to controller: :events, action: :deleted
            else
                render json: {error: 'failed to delete cart item'}, status: :internal_server_error
            end
        else
            render json: {error: 'failed to find cart item'}, status: :internal_server_error
        end
    end

end
