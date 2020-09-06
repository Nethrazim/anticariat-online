class Message < ApplicationRecord

    validates :name, :phone, :message, presence: true
end
