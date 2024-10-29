class Api::V1::FavoritesController < ApplicationController

  before_action :authenticate

  def create
    # 現在ログインしているユーザーが、特定の投稿に対して新しい「いいね」を作成して、それをデータベースに保存する
    @favorite = @current_user.favorites.create(post_id: params[:post_id])
    if @favorite.persisted?
      render json: {message: 'いいねが作られました'}
    else
      render json: {message: 'いいね作成に失敗しました'}
    end
  end

  def destroy
  @favorite = @current_user.favorites.find_by(post_id: params[:post_id])
    if @favorite
      @favorite.destroy
      render json: {message: 'いいねが削除されました'}
    else
      render json: {message: 'いいね削除に失敗しました'}
    end
  end

end

