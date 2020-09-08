Rails.application.routes.draw do
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post "/login", to: "auth#login"
  get "/auto_login", to: "auth#auto_login"
  get "/user_is_authed", to: "auth#user_is_authed"
  get "/username/is_available", to: "auth#username_is_available"
  get "/email/is_available", to: "auth#email_is_available"

  resources :users, only: [:create]
  resources :books
  resources :book_categories
  resources :messages, only: [:create]
  resources :countries, only: [:index, :create] do
    resources :regions, only: [:index, :show, :create, :update]
  end

  resources :orders
  #Book Filters
  namespace 'book_filters' do
    get "/bookcategories_quantity", to: "book_filters#category_quantity"
    get "/authors_quantity", to: "book_filters#authors_quantity"
    get "/publishers_quantity", to: "book_filters#publishers_quantity"
    get "/languages_quantity", to: "book_filters#languages_quantity"
    get "/collections_quantity", to: "book_filters#collections_quantity"
    get "/countries_regions", to: "book_filters#countries_regions"
  end

  namespace 'search' do
    get "/name", to: "search_books#by_name"
    get "/category", to: "search_books#by_category"
    get "/new_books", to: "search_books#by_latest"
    get "/recommendations", to:"search_book#by_recommendations"
  end

  namespace 'subscription' do
    post "/new", to: "subscription#new"
  end

  get "*any", via: :all, to: "errors#not_found"
end
