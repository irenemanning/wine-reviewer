Rails.application.routes.draw do

  resources :reviews,except: [:show]
  resources :wines
  resources :users, only: [:create, :show]

  # get '/hello', to: 'application#hello_world'

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  get "/vintage/:year", to: "wines#find_year_w_reviews"

  
  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

  
end

# Write a custom route that takes a parameter of a year. Find all the wines that have a vintage of that year. Then turn around and find all the reviews of all those wines, sending back a collection of reviews. If there are no reviews yet for the wines, send back a message saying so.
#  If no wines are in the database with that vintage year, send back a clear message that says so, including the year.

