class Subscription < ApplicationRecord
    validates :email, :enabled, presence: true
    
    validates :enabled, :inclusion => {:in => [true, false]}
    
    validates_email_format_of :email, :message => 'Email is not looking good'

    validates_uniqueness_of :email
end
