class User < ApplicationRecord
    has_secure_password

    validates :username, :email, :password, presence: true
    validates_uniqueness_of :username
    validates_uniqueness_of :email
    validates_email_format_of :email, :message => 'Email is not looking good'
end
