class Api::OrdersController < ApplicationController
    before_action :user_authentication
    
    # 注文番号を取得して支払い済みにする
    def is_purchased
        order = Order.find(params[:order_id])
        order.update(isPurchased: true)
    end

    # カートの購入ボタンが押された時に注文を作る
    def create
        order = Order.new(
            cart_id: @cart.id,
            isPurchased: false,
            cart_item_id: @cart.cart_item_id
        )
        if order.save
            @cart.update(cart_item_id: nil)
        end
    end

end
