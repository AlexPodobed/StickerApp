class CreateStickers < ActiveRecord::Migration
  def change
    create_table :stickers do |t|
      t.string :text
      t.integer :position_x
      t.integer :position_y

      t.timestamps
    end
  end
end
