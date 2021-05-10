class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.integer :id, null: false
      t.boolean :isPurchased, null: false, default: false
      t.references :cart, foreign_key: true

      t.timestamps
    end
  end
end
