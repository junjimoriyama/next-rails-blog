class Api::V1::PostsController < ApplicationController

  before_action :authenticate, only: [:show, :create]  
  
  def index
    @posts = Post.includes(:category).all
    render json: @posts.as_json(include: { category: { only: [:name] } })
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: { message: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: {error: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :category_id)
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
