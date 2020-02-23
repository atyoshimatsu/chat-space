class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :body, presence: true, unless: :image?
  validates :image, presence: true, unless: :body?
  mount_uploader :image, ImageUploader

end
