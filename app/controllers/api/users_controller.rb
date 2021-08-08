class Api::UsersController < ApplicationController
    # before_action :user_authentication, only: [:show, :edit, :update] 
    before_action :set_current_user, only: [:show, :edit, :update, :admin_page]
    #before_action :admin_auth, only: [:admin_page]

    # ログイン認証
    def login_auth
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: {
                user: user
            }
            @user = User.find(user.id)
        else
            render json: {}, status: :internal_server_error
        end
    end

    # 新規登録認証
    def signup_auth
        if User.exists?(username: params[:username]) || User.exists?(email: params[:email])
            render json: {}, status: :user_exists
        else
            user = User.new({
                username: params[:username],
                password: params[:password],
                email: params[:email]
            })
            if user.save
                session[:user_id] = user.id
                cart = Cart.new({
                    user_id: user.id
                })
                if cart.save
                    session[:cart_id] = cart.id
                end
            else
                render json: {}, status: :user_save_error
            end
        end
    end

    # ユーザーページを表示
    def show
        render json: {
            user: @user,
            sess: session
        }, status: :ok
    end

    # ユーザー情報編集ページを表示
    def edit
        render json: {
            user: @user
        }
    end

    # ユーザー情報を更新
    def update
        user = User.find(@user.id)
        if params[:username]
            user.update(username: params[:username])
        end

        if params[:email]
            user.update(email: params[:email])
        end
        
    end

    

    # ログアウトする
    def logout
        #session[:user_id] = nil
        session.delete(:user_id)
        session.delete(:cart_id)
        render json: {
            user: @user,
            sess: session
        }, status: :ok
    end

    def admin_page
        if !(@user.username == 'iwashi_nigiri')
            render json: {}, status: :internal_server_error
        else
            render json: {
                user: @user
            }, status: :ok
        end
    end

end
