class PlayersController < ApplicationController

  def index
    render json: Player.all
  end

  def create
    character = @current_user.players.create!(player_params)
    render json: character, status: :created
  end
  def update
      updated_player = Player.find_by(id: params[:id])
      updated_player.update(player_params)
      render json: updated_player
  end
    private

  def player_params
    params.permit(:character_name, :skills, :character_class, :character_race, :hit_points, :id, :player)
  end

end

