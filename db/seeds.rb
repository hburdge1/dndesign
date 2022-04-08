# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
default=User.create!(id: 6, username: 'default', password: 'default')
b=User.create!(username: 'bananabb', password: "acffff")

a=Player.create!(user_id: 6, character_class: 'sorcerer', character_race: 'dragonborn', alignment: 'true neutral', hit_points: 12, proficiencies:['big weapons', 'lil weapons'], CON: 2, WIS: 12, INT: 13, CHA: 17, STR: 8, DEX: 12, hit_die:6, level:1, character_name: 'Viola')
Player.create!(user_id: 6, character_class: 'barbarian', hit_die: 12, character_race: 'dwarf', hit_points: 12, CON: 18, WIS: 12, INT: 13, CHA: 11, STR: 8, DEX: 12, level:1, character_name: 'Smerg')
