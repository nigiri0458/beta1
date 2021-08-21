class Api::OrdersController < ApplicationController
    before_action :set_current_user
    
    # 注文番号を取得して支払い済みにする
    def is_purchased
        order = Order.find(params[:order_id])
        order.update(isPurchased: true)
    end

    # カートの購入ボタンが押された時に注文を作る
    def create
        @@order = nil
        order = Order.new(
            user_id: @@user.id,
            isPurchased: false
        )
        if order.save
            @@order = order
            redirect_to controller: :order_cart_items, action: :create
        else
            render json: {error: 'erro in orders_create'}, status: :internal_server_error
        end
    end

end
