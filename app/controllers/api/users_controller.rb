class Api::UsersController < ApplicationController
    before_action :user_authentication, only: [:show, :edit, :update]
    
    # 新規登録ページを表示
    def signup
        redirect_to("/signup")
    end

    # 新規登録認証
    def signup_auth
        if User.exists?(username: params[:username])
            render json: {}, status: :not_acceptable
        else
            user = User.new(
                username: params[:username],
                password: params[:password],
                email: params[:email]
            )
            if user.save
                session[:user_id] = user.id
                redirect_to("/top")
            else
                render json: {}, status: :internal_server_error
            end
        end
    end

    # ユーザーページを表示
    def show
        user = User.find(@user.id)
        render json: {
            user: user
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
    def login
        redirect_to("/login")
    end

    # ログイン認証
    def login_auth
        user = User.find_by(username: params[:username])
        if user && user.authneticate(params[:password])
            session[:user_id] = user.id
            redirect_to("/top")
        else
            render json: {}, status: :internal_server_error
        end
    end

    # ログアウトする
    def logout
        session[:user_id] = nil
        redirect_to("/top")
    end

end
