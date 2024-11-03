class Api::V1::UsersController < ApplicationController

  before_action :authenticate, except: :create

  def index
    @user = User.all
    render json: {
      allUser: @user,
      current_user: @current_user
  }
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { message:  @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    if @user.present?
      render json: @user
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
