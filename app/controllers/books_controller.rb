class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]
  skip_before_action :require_login, except: [:create]
  # GET /books
  def index
    @books = Book.all

    render json: @books, except: [:created_at, :updated_at]
  end

  # GET /books/1
  def show
    render json: @book, except: [:created_at, :updated_at]
  end

  # POST /books
  def create
    @book = Book.new(book_params)

    if @book.valid?
      @book.save
      render json: @book, except: [:created_at, :updated_at], status: :created
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    if @book.update(book_params)
      render json: @book, except: [:created_at, :updated_at]
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find_by(id: params[:id])
      render json: {status: "not ok", "message": "Book not found."}, status: :not_found unless @book
    end

    # Only allow a trusted parameter "white list" through.
    def book_params
      params.fetch(:book, {}).permit(:author, :title, :publisher, :collection, :release_year, :nr_of_pages, :format, :cover, :language, :condition, :isbn, :book_category_id, :price)
    end
end
