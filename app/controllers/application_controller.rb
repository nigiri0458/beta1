class ApplicationController < ActionController::API
    include ActionController::Cookies
    # before_action :set_current_user, only: [:user_authentication]
    @@user = nil
    @@cart_item_ids = []
    @@cart_items = []
    @@cart = []

    def set_current_user
        if session[:user_id] != nil
            @@user = User.find(session[:user_id])
        else
            render json: {error: "set_current_user", sess: session[:user_id]}, status: :internal_server_error
            @@user = nil
        end
    end
    
    
    #def user_authentication
    #    if @@user == nil
    #        redirect_to "https://www.google.com"
    #    else
    #        @@cart = Cart.find_by(user_id: @user.id)
    #    end
    #end

end
