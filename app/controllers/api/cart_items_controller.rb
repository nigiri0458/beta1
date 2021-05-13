class Api::CartItemsController < ApplicationController
    
    # フロントから event_id と　quantity を受けとり、CartItemを作成
    def create
        cart_item = CartItem.new(
            cart_id: @cart.id,
            event_id: params[:event_id],
            quantity: params[:quantity]
        )

        cart_item.save
    end

    # フロントから new_quantity を受け取り、更新
    def change_quantity
        cart_item = CartItem.find(params[:cart_item_id])
        cart_item.update(quantity: params[:new_quantity])
    end

    # フロントから指示されたアイテムを削除
    def delete
        cart_item = CartItem.find(params[:cart_item_id])
        cart_item.delete
    end


end
