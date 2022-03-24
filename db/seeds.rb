# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
default=User.create!(id: 6, username: 'default', password: 'default')
b=User.create!(username: 'bananabb', password: "acffff")

a=Player.create!(user_id: 6, character_class: 'sorcerer', character_race: 'dragonborn', skills: {'CON': 2, WIS: 12, INT: 13, CHA: 17, STR: 8, DEX: 12}, character_name: 'Viola')
