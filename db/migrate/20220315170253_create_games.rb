class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string  :title
      t.string :party_name
      t.integer :user_id
      t.integer :player_id
      t.integer :map_id
      t.timestamps
    end
  end
end
