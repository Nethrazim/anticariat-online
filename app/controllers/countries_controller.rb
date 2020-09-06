class CountriesController < ApplicationController
    skip_before_action :require_login


    def index 
        countries = Country.all
        render json: countries, except: [:created_at, :updated_at]
    end
end