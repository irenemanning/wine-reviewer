Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  resources :reviews
  resources :wines, only: [:index, :show, :create, :update, :destroy]
  resources :users

  # get '/hello', to: 'application#hello_world'

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"


  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end

# {
#   "wine": {
#     "image_url": "https://upload.wikimedia.org/wikipedia/en/c/c0/Red_Wine_Glass.jpg", 
#     "bottle_name": "Merlot Reserve",
#     "maker": "Vineyard XYZ",
#     "region": "Napa Valley",
#     "vintage": 2019,
#     "profile": "Full-bodied",
#     "category": "Red",
#     "variety": "Merlot",
#     "price": 35
#   }
# }