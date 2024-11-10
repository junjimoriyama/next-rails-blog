class Api::V1::RelationshipsController < ApplicationController

  before_action :authenticate

  def create
    # following
    following = @current_user.relationships.build(follower_id: params[:user_id], following_id: @current_user.id)
    if following.save
      Rails.logger.info("フォローの保存は成功して: #{following.inspect}")
    else
      Rails.logger.info("フォローの保存は失敗して: #{following.errors.full_messages}")
    end
  end

  def destroy
    following = @current_user.relationships.find_by(following_id: params[:user_id])
    following.destroy
  end
end
