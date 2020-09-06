class Subscription::SubscriptionController < ApplicationController
    skip_before_action :require_login


    def new
        begin
            new_subscription = Subscription.new(subscription_params)
            if new_subscription.valid?
                new_subscription.save
                render json: new_subscription, except: [:created_at, :updated_at]
            else
                render json: {errors:new_subscription.errors.full_messages}, status: :not_acceptable
            end
        rescue => exception
            render json: {errors:[exception.message]}, status: 500
        end
    end

private
def subscription_params
    params.permit(:email)
end
end