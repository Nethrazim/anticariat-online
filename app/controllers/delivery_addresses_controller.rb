class DeliveryAddressesController < ApplicationController
    def upsert
        begin
            user = User.includes(:delivery_address).find_by!(id: params[:user_id].to_i)
            delivery_address = user.delivery_address
            delivery_address = DeliveryAddress.new if delivery_address == nil
            delivery_address.address = params[:address]
            delivery_address.city = params[:city]
            delivery_address.country_id = params[:country_id]
            delivery_address.region_id = params[:region_id]
            delivery_address.user_id = user.id

            if delivery_address.valid?
                delivery_address.save 
                render json: {message: "Delivery address saved"}
            else
                render json: {errors: [delivery_address.errors.full_message]}, status: :not_acceptable
            end

        rescue ActiveRecord::RecordNotFound => ex
            render json: ex.message, status: :not_found
        rescue => exception
            render json: exception.message, status: 500
        end
    end

private
def delivery_address_params
    params.permit(:user_id, :address, :city, :country_id, :region_id)
end 
end