class Search::SearchBooksController < ApplicationController
    skip_before_action :require_login


    def by_recommendations
        book_id = params[:book_id]
        book_category_id = params[:book_category_id]
        author = params[:author]
        limit = params[:limit]
        recommended_books = Book.includes(:price_reduction).where("(author = ? or book_category_id = ?) and id <> ?", author, book_category_id, book_id).order("RAND() ").limit(limit)
        
        render json: recommended_books, include: :price_reduction, except: [:created_at, :updated_at]
    end
    
    def by_name
        begin
            search = params[:search]
            per_page  = params[:per_page].to_i
            page = params[:page].to_i
        
            books = Book.includes(:price_reduction).where("author LIKE ? or title LIKE ?", "%" + search + "%", "%" + search + "%").offset(per_page * page).limit(per_page)
            total = Book.where("author LIKE ? or title LIKE ?", "%" + search + "%", "%" + search + "%").count

            render :json => {books: books, total: total}, :include => :price_reduction, :except => [:created_at, :updated_at]                     
        rescue => exception
            binding.pry
            render json: {total: 0, books: []}, status: 500
        end

    end
    
    def by_category
        begin
            category = params[:category]
        
            per_page = params[:per_page].to_i

            page = params[:page].to_i
            page = 1 if page == 0
            
            name = params[:name] if params[:name].present?
            price_from = params[:price_from].to_i if params[:price_from].present?
            price_to  = params[:price_to].to_i if params[:price_to].present?
            year_from = params[:year_from].to_i if params[:year_from].present?
            year_to = params[:year_to].to_i if params[:year_to].present?
            
            book_category = BookCategory.find_by!(name: category)
            books = Book.includes(:price_reduction).left_outer_joins(:price_reduction).where(book_category_id: book_category.id)
            books = books.where('title LIKE ? or author LIKE ?', "%#{name}%", "%#{name}%") if name
            books = books.where('price between ? and ? or (price - ((percent_reduction * price) / 100)) between ? and ?',price_from, price_to, price_from, price_to) if price_from && price_to
            books = books.where(release_year: (year_from..year_to)) if (year_from && year_to)
            books = books.limit(per_page).offset(per_page * (page - 1))
            total = Book.where(book_category_id: book_category.id).count

            render :json => {total: total, books: books}, :include => :price_reduction,:except => [:created_at, :updated_at]
        rescue ActiveRecord::RecordNotFound => ex
            render json: {total: 0, books: []}, status: 200
            print ex.message
        rescue => exception
            render json: {total: 0, books: []}, status: 500
            print exception.message
        end
    end

    def by_latest
        begin
            latest = params[:latest]
            books = Book.includes(:price_reduction).order(created_at: :desc).limit(latest);
            render json: {total: latest, books: books}, include: :price_reduction,except: [:created_at, :updated_at]
        rescue ActiveRecord::RecordNotFound => ex
            render json: {total: 0, books: []}, status: 200
        rescue => exception
            render json: {total: 0, books: []}, status: 500
        end
    end

    def by_author
        begin
            search = params[:search]
            per_page  = params[:per_page].to_i
            page = params[:page].to_i
        
            books = Book.includes(:price_reduction).where("author = ?", search).offset(per_page * page).limit(per_page)
            total = Book.where("author = ?",search).count

            render :json => {books: books, total: total}, :include => :price_reduction, :except => [:created_at, :updated_at]                     
        rescue => exception
            render json: {total: 0, books: []}, status: 500
        end
    end

private
def search_params
    params.permit(:search, :category, :per_page, :page, :name, :price_from, :price_to, :year_from, :year_to, :latest, :book_category_id, :author, :book_id)
end
end
