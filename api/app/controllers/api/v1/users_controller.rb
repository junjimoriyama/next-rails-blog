class Api::V1::UsersController < ApplicationController

  before_action :authenticate, except: :create

  def index
    @user = User.all
    Rails.logger.info("indexのuserは#{@user.inspect}") # .inspect を使ってオブジェクトの内容をわかりやすく出力
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

# def show
#   @user = User.find(params[:id])
#   if @user.present?
#     render json: {
#       user: {
#         id: @user.id,
#         username: @user.username,
#         email: @user.email,
#         avatarUrl: @user.avatar.attached? ? url_for(@user.avatar) : nil 
#       }
#     }
#   end
# end
  
def update
  @user = User.find(params[:id])
  if params[:avatar].present?
    @user.avatar.attach(params[:avatar])
    render json: {avatarUrl: url_for( @user.avatar)}, status: :ok
  else
    render json: {error: "アバターの更新はできませんでした"}, status: :unprocessable_entity
  end
end

def me
  if @current_user
    render json: {
      user: {
        id:  @current_user.id,
        username:  @current_user.username,
        email:  @current_user.email,
        avatarUrl: @current_user.avatar.attached? ? url_for(@current_user.avatar) : nil
      }
    }
  end
end

private
def user_params
  params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
end
end








































# def show
#   @user = User.find(params[:id])
#   if params[:avatar].present?
#     @user.avatar.attached(params[:avatar])
#     if @user.save
#       render json: {avatarUrl: url_for( @user.avatar)}, status: :ok
#     end
#   end
#   if @user.present?
#     render json: {
#       user: {
#         id: @user.id,
#         username: @user.username,
#         email: @user.email,
#         avatarUrl: @user.avatar.attached? ? url_for(@user.avatar) : nil # アバターのURLを含める
#       }
#     }
#   end
# end

# def update
#   @user = User.find(params[:id])
#   if params[:avatar].present?
#     @user.avatar.attach(params[:avatar])
#   end

#   if @user.save
#     render json: {avatarUrl: url_for( @user.avatar)}, status: :ok
#   else
#     render json: {avatarUrl: url_for()}, status: :unprocessable_entity
#   end
# end