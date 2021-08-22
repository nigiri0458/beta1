class AddColumnToEvent < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :stock, :integer
  end
end
