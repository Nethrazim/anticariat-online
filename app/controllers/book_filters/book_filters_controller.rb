class BookFilters::BookFiltersController < ApplicationController
  skip_before_action :require_login, except: [:by_quantity]
    
  def category_quantity
    book_categories = Book.group(:book_category_id).sum(:quantity)
    result = []

    book_categories.each do |entry|
      bc = {}
      category = BookCategory.find_by(id: entry)
      bc[:book_category] = category.name
      bc[:count] = entry[1]
      result << bc
    end
    
    render json: result
  end


  def authors_quantity
    authors = Book.group(:author).count
    result = []
    authors.each do |entry|
      a = {authors: entry[0], count: entry[1]}
      result << a
    end

    render json: result
  end

  def publishers_quantity 
    publishers = Book.group(:publisher).count
    result = []
    publishers.each do |entry|
      p = {publisher: entry[0], count: entry[1]}
      result << p
    end

    render json: result
  end

  def languages_quantity 
    languages = Book.group(:language).count
    result = []
    languages.each do |entry|
      l = {language: entry[0], count: entry[1]}
      result << l
    end

    render json: result
  end

  def collections_quantity 
    collections = Book.group(:collection).count
    result = []
    collections.each do |entry|
      c = {collection: entry[0], count: entry[1]}
      result << c
    end

    render json: result
  end

  def countries_regions
    countries_regions = Country.includes(:regions).all
    render json: countries_regions.to_json(:include => :regions), except:[:created_at, :updated_at]
  end
end
