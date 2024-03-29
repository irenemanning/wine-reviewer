class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    def index
        reviews = @current_user.reviews
        render json: reviews
    end
    def show
        review = @current_user.reviews.find_by(id: params[:id])
        render json: review
    end
    def create
        review = @current_user.reviews.create!(review_params)
        render json: review, status: :created
    end
    def update
        review = @current_user.reviews.find_by(id: params[:id])
        review.update!(review_params)
        render json: review
    end
    def destroy
        review = @current_user.reviews.find(params[:id])
        review.destroy
        head :no_content
    end

    private
    def review_params
        params.permit(:wine_id, :wuser_id, :rating, :review)
    end
    def render_not_found_response
        render json: { error: "review not found" }, status: :not_found
    end
end
