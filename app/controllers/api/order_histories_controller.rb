class Api::OrderHistoriesController < ApplicationController
        # ユーザの注文履歴を表示
    def index
        order_history = OrderHistory.find_by(user_id: @user.id)
        render json: {
            order_history: order_history
        }, status: :ok
    end

    # １つの注文を表示
    def show
        order = Order.find(params[:order_id])
        render json: {
            order: order
        }, status: :ok
    end

end
