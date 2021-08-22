Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    # APPLICATION
    post 'userAuthentication', to: 'application#user_authentication'
    post 'setCurrentUser', to: 'application#set_current_user'

    # USERS
    post 'signupAuth', to: 'users#signup_auth'
    get 'users/mypage', to: 'users#show'
    get 'users/edit', to: 'users#edit'
    post 'users/update', to: 'users#update'
    post 'loginAuth', to: 'users#login_auth'

    post 'logout', to: 'users#logout'

    get 'admin', to: 'users#admin_page'
  
    # EVENTS
    get 'events', to: 'events#index'
    get 'events/:event_id', to: 'events#show'
    post 'events/create', to: 'events#create'
    post 'added_to_cart', to: 'events#added'
    post 'deleted_from_cart', to: 'events#deleted'

    # CARTS
    get 'users/:user_id/cart', to: 'carts#index'
  
    # CART_ITEMS
    get 'cart_items_show', to: 'cart_items#show'
    post 'events/:event_id/create', to: 'cart_items#create'
    post 'cart_items/:cart_item_id/changeQuantity', to:'cart_items#change_quantity'
    post 'cart_items/delete', to: 'cart_items#delete'

    # USER_CART_ITEMS
    post 'cart_items/purchase', to: 'user_cart_items#purchase'

    # ORDER_HISTORIES
    get 'order_histories', to: 'order_histories#index'
    get 'order_histories/:order_id', to: 'order_histories#show'
    
    
    # ORDERS
    post 'order_histories/:order_id/isPurchased', to: 'orders#is_purchased'
    post 'orders/create', to: 'orders#create'

    #ORDER_CART_ITEMS
    post 'order_cart_items/create', to: 'order_cart_items#create'
  end
  
end
