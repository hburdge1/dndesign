class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :character_class, :character_race, :character_name, :skills, :hit_points, :user_id
  has_one :user
end
