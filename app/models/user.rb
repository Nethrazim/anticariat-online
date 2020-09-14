class User < ApplicationRecord
    has_secure_password

    has_one :delivery_address
    accepts_nested_attributes_for :delivery_address

    validates :username, :email, presence: true
    
    validates :password,  presence: true, on: :create

    validates_uniqueness_of :username

    validates_uniqueness_of :email

    validates_email_format_of :email, :message => 'Email is not looking good'
end
