class Api::V1::PostsController < ApplicationController
  #認証後に実行できる処理
  # before_action :authenticate, only: [:show, :create]
  before_action :authenticate # 全アクションに適用

  def index
    sort_order = params[:sort_order] == 'asc' ? :asc : :desc
    @posts = Post.includes(:category)
                .order(created_at: sort_order)
                .map do |post|
      post_data = post.attributes      
      post_data[:favorites] = @current_user.already_favorited?(post)
      post_data[:category] = post.category.name
      post_data
    end
    render json: @posts
  end
  
  def show
    @post = Post.find(params[:id])
    post_data = @post.attributes
    # postsページのuserによるいいねの有無を確認
    post_data[:favorites] = @current_user.already_favorited?(@post)
    post_data[:category] = @post.category.name

    render json: {
      post: post_data,
      current_user: @current_user,
    }
  end

  def create
    @post = @current_user.posts.build(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: { message: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # def create
  #   @post = Post.new(post_params)
  #   if @post.save
  #     render json: @post, status: :created
  #   else
  #     render json: { message: @post.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: { error: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :category_id,)
  end
end

# class Api::V1::PostsController < ApplicationController
#   def index
#     @posts = Post.all
#     render json: @posts
#   end

#   def show
#     @post = post.find(params[:id])
#     render json: @post
#   end

#   def create
#     @posts = Post.new(post_params)
#       if @post.save
#         render json: @post, status: :created
#       else
#         render json: @post, status: :unprocessable_entity
#       end
#   end

#   def update

#   end

#   def destroy
#   end

#   private
#   def post_params
#     params.require(:post).permit(:title, :content, category: [])
#   end
# end
