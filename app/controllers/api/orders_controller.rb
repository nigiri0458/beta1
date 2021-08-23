class Api::OrdersController < ApplicationController
    before_action :set_current_user
    
    # 注文番号を取得して支払い済みにする
    def is_purchased
        order = Order.find(params[:order_id])
        order.update(isPurchased: true)
    end

end
