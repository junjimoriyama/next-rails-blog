Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :show, :create, :update, :destroy]
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resource :favorite, only: [:create, :destroy]
      end
      resources :users, only: [:index, :show, :create, :update, :destroy]
      # 認証
      post 'login', to: 'authentication#login'
      # パスワード(authenticateコントローラーに振り分ける様に設定)
    end
  end

  # /up にアクセスするとアプリの状態を確認でき、正常なら200、異常なら500を返す。
  get "up" => "rails/health#show", as: :rails_health_check

  # アプリのルートパスを設定する場所。
  # root "posts#index"
end