class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name, null:false
      t.string :group, null: false
      t.string :image, null: false
      t.date :date, null:false
      t.text :description, null:false
      t.text :info
      t.integer :price, null:false
      
      t.timestamps
    end
  end
end
