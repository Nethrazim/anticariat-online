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

    def update 
        begin
            user = User.find_by(username: params[:username])
            user.first_name = params[:first_name]
            user.last_name = params[:last_name]
            user.phone = params[:phone]
            user.email = params[:email]
            if user.valid? 
                user.save
                render json: {"message": "User updated"}
            else
                render json: {errors:[user.errors.full_message]}, status: :not_acceptable
            end

        rescue ActiveRecord::RecordNotFound => ex
            render json: ex.message, status: :not_found
        rescue => exception
            render json: exception.message, status: 500
        end 
    end
    
private
def user_params
    params.permit(:username, :password, :email, :first_name, :last_name, :phone, :email)
end

end
