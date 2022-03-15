class Map < ApplicationRecord
    belongs_to :game
    belongs_to :combat, default: nil
end
