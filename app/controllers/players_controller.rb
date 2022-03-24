class PlayersController < ApplicationController

  def index
    render json: Player.all
  end

  def create
    character = @current_user.players.create!(player_params)
    render json: character, status: :created
  end
    private

  def player_params
    params.permit(:character_name, :skills, :character_class, :character_race)
  end

end

