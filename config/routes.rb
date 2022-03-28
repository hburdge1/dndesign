Rails.application.routes.draw do
  resources :character_sheets
  resources :maps
  resources :players
  resources :combats
  resources :games
  resources :users
      get '/me', to: 'users#show'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/logged_in', to: 'sessions#is_logged_in?'
      post '/new', to: 'players#create'
      post '/character_sheet', to: 'character_sheets#create'
      post "/signup", to: "users#create"
      patch '/players/:id', to: "players#update"
end
