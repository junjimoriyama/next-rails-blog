class Api::V1::UsersController < ApplicationController

  before_action :authenticate, except: :create

  def index
    @users = User.all
    if @users.present?
      render json: @users.map { |user|
        {
          id: user.id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatar.attached? ? url_for(user.avatar) : nil,
          # created_at: user.created_at
        }
      }
    else
      render json: { message: "ユーザーが見つかりません" }, status: :not_found
    end
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
    render json: {
      id: @user.id,
      username: @user.username,
      email: @user.email,
      avatarUrl: @user.avatar.attached? ? url_for(@user.avatar) : nil 
    }
  end
end
  
def update
  @user = User.find(params[:id])
  if params[:avatar].present?
    @user.avatar.attach(params[:avatar])
    render json: {avatarUrl: url_for( @user.avatar)}, status: :ok
  else
    render json: {error: "アバターの更新はできませんでした"}, status: :unprocessable_entity
  end
end

# 現在のユーザー取得
def me
  if @current_user
    render json: {
      id:  @current_user.id,
      username:  @current_user.username,
      email:  @current_user.email,
      avatarUrl: @current_user.avatar.attached? ? url_for(@current_user.avatar) : nil
      }
  end
end

# フォローしているユーザー全員取得
def followings
  followingsUser =  @current_user.followings.map do |user|
    # image_urlにアバターのURLを格納できる
    # image_url = user.avatar.attached? ? url_for(user.avatar) : nil
    # 新しいオブジェクト(ハッシュ)を返す
    {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatar.attached? ? url_for(user.avatar) : nil
    }
  end
  render json: followingsUser
end

# フォローされているユーザー全員取得
def followers
  followerUsers = @current_user.followers.map { |user|
    {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatar.attached? ? url_for(user.avatar) : nil
    }
  }
  render json: followerUsers
end

# パラメーターの設定
private
def user_params
  params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar)
end
end













# # Userモデルに画像URL用の属性を追加
# class User < ApplicationRecord
#   attr_accessor :image_url
#   has_one_attached :avatar

#   # image_urlにアタッチされたアバターのURLを返す
#   def image_url
#     avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(avatar, only_path: true) : nil
#   end
# end

# # コントローラー
# class Api::V1::UsersController < ApplicationController
#   # フォローしているユーザー全員取得
#   def followings
#     # それぞれのフォローユーザーにimage_urlを含めて返す
#     followings_with_image = @current_user.followings.map do |user|
#       user.image_url = user.image_url # 画像URLを設定
#       user
#     end

#     render json: followings_with_image.as_json(only: [:id, :username, :email], methods: [:image_url])
#   end
# end
























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