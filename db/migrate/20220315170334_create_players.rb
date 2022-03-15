class CreatePlayers < ActiveRecord::Migration[6.1]
  def change
    create_table :players do |t|
      t.integer :user_id
      t.string  :token_image
      t.integer :char_sheet_id
      t.timestamps
    end
  end
end
