class ReviewsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    def index
        reviews = @current_user.reviews
        render json: reviews
    end
    def show
        review = @current_user.reviews.find_by(params[:id])
    end
    def create
        review = @current_user.reviews.create!(review_params)
        render json: review.wine, status: :created
    end
    # def update
    # end
    # def destroy
    # end

    private
    def review_params
        params.permit(:wine_id, :rating, :opinion)
    end
    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
    def render_not_found_response
        render json: { error: "Signup not found" }, status: :not_found
    end
end
