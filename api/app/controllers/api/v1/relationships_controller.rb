class Api::V1::RelationshipsController < ApplicationController

  before_action :authenticate

  def create
    # following = Relationship.new(following_id: @current_user, follower_id: params[:user_id])
    following = @current_user.relationships.build(follower_id: params[:user_id])
    following.save
  end
  

  def destroy
    following = @current_user.relationships.find_by(follower_id: params[:user_id])
    following.destroy
  end
end
