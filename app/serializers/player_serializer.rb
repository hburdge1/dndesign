class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :character_class, :character_race, :character_name, :alignment, :skills, :hit_points, :user_id, :proficiencies, :level
  has_one :user
end
