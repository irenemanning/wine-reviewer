class WusersController < ApplicationController
    skip_before_action :authorize, only: :create
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

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

    def update
        if params[:wuser][:profile_image].present? && params[:wuser][:profile_image].respond_to?(:read)
            if @current_user.update(profile_image: params[:wuser][:profile_image])
                render json: @current_user
            else
                errors = @current_user.errors.full_messages.join(', ')
                puts "Error updating profile image: #{errors}"
                render json: { errors: errors }, status: :unprocessable_entity
            end
        else
            render json: { errors: ["Profile image is missing or invalid"] }, status: :unprocessable_entity
        end
    end

    private

    # def user_params
    #     params.permit(:username, :password, :password_confirmation, :profile_image)
    # end
    def user_params
        params.require(:wuser).permit(:username, :password, :password_confirmation, :profile_image)
    end

    def render_not_found_response
        render json: { error: "Signup not found" }, status: :not_found
    end

end
