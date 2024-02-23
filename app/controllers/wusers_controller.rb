class WusersController < ApplicationController
    skip_before_action :authorize, only: :create
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    # def index
    #     users = User.all
    #     render json: users
    # end
     #  /me
    def show
        render json: @current_user
    end

    # /signup
    def create
        user = Wuser.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    # /update

    def update_profile_image
        @current_user.update(profile_image: params[:user][:profile_image])
        render json: @current_user  
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :image_url)
    end

    # def render_unprocessable_entity_response(invalid)
    #     render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    # end

    def render_not_found_response
        render json: { error: "Signup not found" }, status: :not_found
    end

end
