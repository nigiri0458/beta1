class Api::UsersController < ApplicationController
    # before_action :user_authentication, only: [:show, :edit, :update] 
    before_action :set_current_user, only: [:show, :edit, :update, :admin_page]
    #before_action :admin_auth, only: [:admin_page]

    # ログイン認証
    def login_auth
        login_user = User.find_by(username: params[:username])
        if login_user && login_user.authenticate(params[:password])
            session[:user_id] = login_user.id
            render json: {
                user: login_user
            }
            #@user = User.find(user.id)
        else
            render json: {}, status: :internal_server_error
        end
    end

    # 新規登録認証
    def signup_auth
        if User.exists?(username: params[:username]) || User.exists?(email: params[:email])
            render json: {}, status: :not_acceptable
        else
            new_user = User.new({
                username: params[:username],
                password: params[:password],
                email: params[:email]
            })
            if new_user.save
                session[:user_id] = new_user.id
            else
                render json: {}, status: :internal_server_error
            end
        end
    end

    # ユーザーページを表示
    def show
        render json: {
            user: @@user,
            sess: session
        }, status: :ok
    end

    # ユーザー情報編集ページを表示
    def edit
        render json: {
            user: @@user
        }
    end

    # ユーザー情報を更新
    def update
        update_user = User.find(@@user.id)
        if params[:username]
            update_user.update(username: params[:username])
            @@user = update_user
        end

        if params[:email]
            update_user.update(email: params[:email])
            @@user = update_user
        end
        
    end

    

    # ログアウトする
    def logout
        #session[:user_id] = nil
        session.delete(:user_id)
        @@user = nil
        render json: {
            user: @@user,
            sess: session
        }, status: :ok
    end

    def admin_page
        if !(@@user.username == 'iwashi_nigiri')
            render json: {}, status: :internal_server_error
        else
            render json: {
                user: @@user
            }, status: :ok
        end
    end

end
