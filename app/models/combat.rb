class Combat < ApplicationRecord
    belongs_to :map
    belongs_to :game, through: :map

end
