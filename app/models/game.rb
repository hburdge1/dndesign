class Game < ApplicationRecord
    belongs_to :user
    has_many :players
    has_many :maps
    has_many :combats, through: :maps
end
