# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_15_170404) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "combats", force: :cascade do |t|
    t.string "description"
    t.string "npcs", array: true
    t.string "turn_order", array: true
    t.integer "map_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "games", force: :cascade do |t|
    t.string "title"
    t.string "party_name"
    t.integer "user_id"
    t.integer "player_id"
    t.integer "map_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "maps", force: :cascade do |t|
    t.integer "game_id"
    t.integer "combat_id"
    t.string "npcs", array: true
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "players", force: :cascade do |t|
    t.integer "user_id"
    t.string "token_image"
    t.string "character_name"
    t.string "character_class"
    t.string "character_second_class"
    t.string "character_race"
    t.string "character_second_race"
    t.integer "ability_scores", array: true
    t.string "skills"
    t.string "proficiencies", array: true
    t.string "languages"
    t.string "alignment"
    t.string "background"
    t.string "equipment", array: true
    t.integer "STR"
    t.integer "CHA"
    t.integer "WIS"
    t.integer "CON"
    t.integer "DEX"
    t.integer "INT"
    t.string "feats", array: true
    t.integer "hit_points"
    t.integer "level"
    t.integer "hit_die"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.integer "game_id"
    t.integer "player_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
