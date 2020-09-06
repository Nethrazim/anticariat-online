class RegionsController < ApplicationController
    skip_before_action :require_login, except: [:create]

    def index 
        begin
            country = Country.find_by!(id: params[:country_id])
            regions = Region.where(country_id: country.id)
            render json: regions, except: [:created_at, :updated_at]
        rescue ActiveRecord::RecordNotFound => ex
            render json: ex.message, status: :not_found
        rescue Exceptionn => ex 
            render json: ex.message, status: 500
        end
    end

    def show
        begin
            country = Country.find_by!(id: params[:country_id])
            region = Region.find_by!(country_id: country.id)
            render json: region, except: [:created_at, :updated_at, :country_id]
        rescue ActiveRecord::RecordNotFound => ex
            render json: ex.message, status: :not_found
        rescue Exceptionn => ex 
            render json: ex.message, status: 500
        end
    end

    def create
    end

    def update 
        
    end
end