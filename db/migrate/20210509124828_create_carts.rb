class CreateCarts < ActiveRecord::Migration[6.1]
  def change
    create_table :carts do |t|
      t.integer :id, null: false
      t.references :user, null: false, foreign_key: true
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
