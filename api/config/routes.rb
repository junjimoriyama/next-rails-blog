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

      resources :password_resets, only: [:new, :create, :edit, :update]
    
    end
  end

  # /up にアクセスするとアプリの状態を確認でき、正常なら200、異常なら500を返す。
  get "up" => "rails/health#show", as: :rails_health_check

  # get 'password_reset/edit', to: 'password_resets#edit', as: 'edit_password_reset'

  # Letter Opener Webのルーティング (開発環境のみ
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  # アプリのルートパスを設定する場所。
  # root "posts#index"
end