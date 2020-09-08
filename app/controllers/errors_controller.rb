class ErrorsController < ApplicationController
    skip_before_action :require_login
    
    def not_found
        redirect_to "/"
    end
end