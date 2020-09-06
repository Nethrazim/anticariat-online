class UsersController < ApplicationController
    skip_before_action :require_login, only: [:create]

    def create 
        user = User.new(user_params)
        if user.valid?
            user.save 
            token = encode_token({user_id: user.id})
            render json: {user: user, token: token}, except: [:created_at, :updated_at, :password_digest]
        else
            render json: {errors: user.errors.full_messages}, status: :not_acceptable
        end
    end


private
def user_params
    params.permit(:username, :password, :email)
end

end
