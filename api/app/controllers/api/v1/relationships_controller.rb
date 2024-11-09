class RelationshipsController < ApplicationController

  before_action :authenticate

  def create
    # following
    following = @current_user.relationship.build(following_id: params[:user_id])
    following.save
    # follower

    
  end

  def destroy

  end
end
