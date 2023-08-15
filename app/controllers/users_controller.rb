class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    # /signup
    def create
        user = User.create(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    #  /me
    def show
        render json: @current_user
    end
      
    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :image_url)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Signup not found" }, status: :not_found
    end

end
