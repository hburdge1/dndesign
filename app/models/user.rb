class User < ApplicationRecord
has_many :games
has_many :players, :through => :games, :class_name => "User"
has_secure_password

validates :username, uniqueness: true
validates :username, presence: true
end
