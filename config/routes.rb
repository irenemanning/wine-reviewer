Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  resources :reviews
  resources :wines, only: [:index, :show, :create, :update, :destroy]
  resources :users

  get '/hello', to: 'application#hello_world'

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
