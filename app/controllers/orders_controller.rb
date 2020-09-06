class OrdersController < ApplicationController
    skip_before_action :require_login

    def index 
        orders = Order.all
        render json: orders, except:[:created_at, :updated_at]
    end

    def create
        begin
            contact_person = params.require(:order).require(:contact_person).permit(:first_name, :last_name, :email, :phone)
            delivery_address = params.require(:order).require(:delivery_address).permit(:address, :country_id, :region_id, :city)
            order_details = params.require(:order).permit(order_details: [])[:order_details]
            #total order amount
            books = Book.where("id in (?)", order_details)
            total_price = 0
            books.each do |book|
                total_price += book.price
            end

            #order quantity 
            quantity = order_details.length

            #order status
            status = "NEW"
            #order delivery address
            order_delivery_address = OrderDeliveryAddress.new(delivery_address)
            if order_delivery_address.valid?
                order_delivery_address.save
                
                #order
                order = Order.new
                order.total_price = total_price
                order.quantity = quantity
                order.status = status
                order.order_delivery_address_id = order_delivery_address.id
                order.first_name = contact_person[:first_name]
                order.last_name = contact_person[:last_name]
                order.email = contact_person[:email]
                order.phone = contact_person[:phone]

                order_details.each do |ode|
                    order.order_details.push(OrderDetail.new(book_id: ode))
                end
                if order.valid?
                    order.save
                    render json: "Order created"
                else
                    render json: order.errors.full_messages, status: :not_acceptable
                end
            else
                render json: order_delivery_address.errors.full_messages, status: :not_acceptable
            end
        rescue => ex
            render json: ex.message, status: 500
        end
    end

    def show
    end

    def update
    end

private 
    def order_params
        binding.pry
        params.permit(:contact_person, :delivery_address, :order_details)
    end
end
