Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  resources :reviews
  resources :wines
  resources :users
  get '/hello', to: 'application#hello_world'
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
