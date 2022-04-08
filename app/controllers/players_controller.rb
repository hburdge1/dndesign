class PlayersController < ApplicationController
  # def index
  #   players = Player.where(user_id: @current_user.id)
  #   render json: players
  # end
  def index
    render json: Player.all
  end
  def show
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
    params.permit(:character_name, :STR, :WIS, :CON, :DEX, :INT, :CHA, :character_class, :character_race, :alignment, :hit_die, :hit_points, :id, :player, :proficiencies, :level)
  end

end

