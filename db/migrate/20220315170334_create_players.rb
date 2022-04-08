class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :user_id
      t.string  :token_image
      t.string :character_name
      t.string :character_class
      t.string :character_second_class, null: true
      t.string :character_race
      t.string :character_second_race, null: true
      t.integer :ability_scores, array: true
      t.string :skills, hash: true
      t.string  :proficiencies, array: true
      t.string  :languages, object: true
      t.string :alignment
      t.string :background
      t.string :equipment, array: true
      t.integer :STR
      t.integer :CHA
      t.integer :WIS
      t.integer :CON
      t.integer :DEX
      t.integer :INT
      t.string :feats, array: true
      t.integer :hit_points
      t.integer :level
      t.integer :hit_die
      t.timestamps
    end
  end
end
