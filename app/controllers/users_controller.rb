class UsersController < ApplicationController
    
    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :image_url)
    end

end
