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
            cart.push({"cart_item_id" => cart_item.id, "event_id" => event.id, "event_name" => event.name, "event_image" => event.image, "quantity" => cart_item.quantity, "event_price" => event.price, "event_stock" => event.stock })
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
        old_quantity = cart_item.quantity
        if cart_item.update(quantity: params[:new_quantity])
            event = Event.find(cart_item.event_id)
            old = event.stock
            if event.update(stock: old + (old_quantity - params[:new_quantity]))
                puts event.stock
                render json: {status: 'changed stock'}, status: :ok
            else
                render json: {error: 'failed to change stock'}, status: :internal_server_error
            end
        else
            render json: {error: 'failed to change quantity'}, status: :internal_server_error
        end
    end

    # フロントから指示されたアイテムを削除
    def delete
        cart_item = CartItem.find(params[:cart_item_id])
        if cart_item
            event = Event.find(cart_item.event_id)
            old = event.stock
            event.update(stock: old + cart_item.quantity)
            if cart_item.destroy
                user_cart_item = UserCartItem.find_by(cart_item_id: params[:cart_item_id])
                if user_cart_item.destroy
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
    end

end
