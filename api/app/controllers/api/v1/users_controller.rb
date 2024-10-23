class Api::V1::UsersController < ApplicationController

  def index
    @user = User.all
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { message:  @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
