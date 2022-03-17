Rails.application.routes.draw do
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
end
