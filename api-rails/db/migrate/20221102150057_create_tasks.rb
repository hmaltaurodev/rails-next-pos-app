class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.boolean :is_completed
      t.string :description
      t.references :category, null: false, foreign_key: true
      t.references :person_in_charge, null: false, foreign_key: { to_table: :persons }

      t.timestamps
    end
  end
end
