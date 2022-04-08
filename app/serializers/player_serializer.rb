class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :character_class, :character_race, :hit_die, :STR, :WIS, :CON, :DEX, :INT, :CHA, :character_name, :alignment, :hit_points, :user_id, :proficiencies, :level
  has_one :user
end
