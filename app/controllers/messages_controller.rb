class MessagesController < ApplicationController
    skip_before_action :require_login, only: [:create]

    def create
        begin
            message = Message.new(message_params)
            if message.valid?
                message.save
                render json: message, except: [:created_at, :updated_at]
            else
                render json: {errors: message.errors.full_messages}, status: :not_acceptable
            end
        rescue => exception 
            render json: {errors: exception.message}, status: :interna
        end
    end


private 
def message_params
    params.permit(:name, :phone, :message)
end
end