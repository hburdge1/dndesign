class CreateCombats < ActiveRecord::Migration[6.1]
  def change
    create_table :combats do |t|
      
      t.string :description
      t.string :npcs, array: true
      t.string :turn_order, array: true
      t.integer :map_id
      t.timestamps
    end
  end
end
