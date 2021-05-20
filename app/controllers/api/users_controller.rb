class Api::UsersController < ApplicationController
    # before_action :user_authentication, only: [:show, :edit, :update]

    # ログイン認証
    def login_auth
        @user = User.find_by(username: params[:username])
        if @user && @user.authenticate(params[:password])
            session[:user_id] = @user.id
            render json: {
                user: @user,
                sess: session
            }
            # @user = User.find(user.id)
        else
            render json: {}, status: :internal_server_error
        end
    end

    # 新規登録認証
    def signup_auth
        if User.exists?(username: params[:username]) || User.exists?(email: params[:email])
            render json: {}, status: :not_acceptable
        else
            user = User.new({
                username: params[:username],
                password: params[:password],
                email: params[:email]
            })
            if user.save
                session[:user_id] = user.id
            else
                render json: {}, status: :internal_server_error
            end
        end
    end

    # ユーザーページを表示
    def show
        user = User.find_by(id: session[:user_id])
        render json: {
            user: user,
            sess: session
        }
    end

    # ユーザー情報編集ページを表示
    def edit
        user = User.find(@user.id)
        render json: {
            user: user
        }
    end

    # ユーザー情報を更新
    def update
        user = User.find(@user.id)
        user.update(
            username: params[:username],
            email: params[:email]
        )
    end

    # ログインページを表示

    

    # ログアウトする
    def logout
        session[:user_id] = nil
    end

end
