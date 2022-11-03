class CreatePersons < ActiveRecord::Migration[7.0]
  def change
    create_table :persons do |t|
      t.string :name

      t.timestamps
    end
  end
end
