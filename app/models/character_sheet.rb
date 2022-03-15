class CharacterSheet < ApplicationRecord
    belongs_to :player
    belongs_to :user, through: :player
end
