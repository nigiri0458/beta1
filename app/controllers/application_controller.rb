class ApplicationController < ActionController::API
    include ActionController::Cookies

    def set_current_user
        if session[:user_id] != nil
            @user = User.find(session[:user_id])
            @cart = Cart.find_by(user_id: @user.id)
        else
            render json: {error: "set_current_user", sess: session[:user_id]}, status: :internal_server_error
            @user = nil
            @cart = nil
        end
    end

end
