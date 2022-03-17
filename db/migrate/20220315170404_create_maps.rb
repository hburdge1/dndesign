class CreateMaps < ActiveRecord::Migration[6.1]
  def change
    create_table :maps do |t|
      t.integer :game_id
      t.integer :combat_id
      t.string :npcs, array: true
      t.string :image
      t.timestamps
    end
  end
end
