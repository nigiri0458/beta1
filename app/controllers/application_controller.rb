class ApplicationController < ActionController::API
    before_action :set_current_user

    def set_current_user
        @user = User.find(session[:user_id])
    end
    
    
    def user_authentication
        if @user == nil
            redirect_to("/login")
        end
    end

end
