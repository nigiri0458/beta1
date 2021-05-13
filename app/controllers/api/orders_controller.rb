class Api::OrdersController < ApplicationController
    # 注文番号を取得して支払い済みにする
    def is_purchased
        order = Order.find(params[:order_id])
        order.update(isPurchased: true)
    end

    # カートの購入ボタンが押された時に注文を作る
    def create
        order = Order.new(cart_id: @cart.id, isPurchased: false)
        order.save
    end

end
