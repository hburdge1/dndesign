class Player < ApplicationRecord
    belongs_to :user
    serialize :skills, Hash
   
end
