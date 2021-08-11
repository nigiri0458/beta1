class Api::CartItemsController < ApplicationController
    before_action :set_current_user

    # フロントから event_id と　quantity を受けとり、CartItemを作成
    def create
        cart_item = CartItem.new(
            event_id: params[:event_id],
            quantity: params[:quantity]
        )

        if cart_item.save
            render template: "user_cart_items/create/#{cart_item.id}"
        else
            render json: {error: "cart_item.save"}, status: :internal_server_error
        end
    end

    # フロントから new_quantity を受け取り、更新
    def change_quantity
        cart_item = CartItem.find(params[:cart_item_id])
        cart_item.update(quantity: params[:new_quantity])
    end

    # フロントから指示されたアイテムを削除
    def delete
        cart_item = CartItem.find(params[:cart_item_id])
        if cart_item.delete
            render template: "user_cart_items/delete/#{cart_item.id}"
        end
    end


end
