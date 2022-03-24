Rails.application.routes.draw do
    namespace :api do
  resources :character_sheets
  resources :maps
  resources :players
  resources :combats
  resources :games
  resources :users
      get '/me', to: 'users#index'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'
      post '/players', to: 'players#create'
      post '/character_sheet', to: 'character_sheets#create'
        post "/signup", to: "users#create"
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end