class Task < ApplicationRecord
  belongs_to :category
  belongs_to :person_in_charge, class_name: "Person"

  validates :description, presence: true
end
