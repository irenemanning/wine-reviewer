class WinesController < ApplicationController
    skip_before_action :authorize, only: [:index, :before2000]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        wines = Wine.includes(reviews: :wuser).all
        render json: wines
    end
    def show
        wine = find_wine
        render json: { wine: wine.as_json.merge({ price: format('%.2f', wine.price) }) }
    end
    def create
        wine = Wine.create!(wine_params)
        render json: wine, status: :created
    end
    def update
        wine = find_wine
        wine.update(wine_params)
        render json: wine
    end
    def destroy
        wine = find_wine
        wind.destroy
        head :no_content
    end

    private

    def wine_params
        params.permit(:image_url, :bottle_name, :maker, :region, :vintage, :profile, :category, :variety, :price)
    end
    def find_wine
        Wine.find_by(id: params[:id])
    end
    def render_not_found_response
        render json: { error: "Signup not found" }, status: :not_found
    end
end
