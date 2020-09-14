class AuthController < ApplicationController
    skip_before_action :require_login, only: [:login, :auto_login, :username_is_available, :email_is_available, :user_is_authed]

    def username_is_available
        params.permit(:username)
        user = User.find_by(username: params[:username])
        if !user
            render json: {status: "ok", message: "Username is available"}
        else
            render json: {status: "not ok", message: "Username is not available"}
        end 
    end

    def email_is_available
        params.permit(:email)
        user = User.find_by(email: params[:email])
        if !user 
            render json: {status: "ok", message: "Email is available"}
        else
            render json: {status: "not ok", message: "Email is not available"}
        end
    end

    def login 
        user = User.includes(:delivery_address).find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session[:current_user_id] = user.id
            payload = {user_id: user.id}
            token = encode_token(payload)
            
            response = {
                status: "ok",
                token: token, 
                message: "Welcome back, #{user.username}",
                :user => user.serializable_hash
            };
            response[:user][:delivery_address] = user.delivery_address.serializable_hash

            
            render json: response
        else
            render json: {errors: ["Log in failed! Username or password invalid!"]}, status: 401
        end
    end

    def auto_login
        if session_user 
            render json: session_user
        else 
            render json: { errors: "No User Logged In" }
        end
    end

    def user_is_authed 
        if session_user
            render json: { message: "You are authorized", user:session_user }
        else
            render json: { errors: "No User Logged In"}, status: 404
        end
    end
end
