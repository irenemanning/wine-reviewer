Rails.application.routes.draw do

  resources :reviews, except: [:show]
  resources :wines
  resources :wusers, only: [:create, :show, :update]

  # get '/hello', to: 'application#hello_world'

  post "/signup", to: "wusers#create"
  get "/me", to: "wusers#show"
  patch "/me/update", to: "wusers#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

end

