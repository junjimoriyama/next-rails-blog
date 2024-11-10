Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :show, :create, :update, :destroy]
      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        resource :favorite, only: [:create, :destroy]
      end
      # ユーザー
      resources :users, only: [:index, :show, :create, :update, :destroy] do
        get 'me', on: :collection
        # 各ユーザーに対して relationship ルートを設定（create、destroy のみ）
        resource :relationship, only: [:create, :destroy]
        # 特定のユーザー（id）に対して、フォローしているユーザー（followings）とフォロワー（follower）を取得するルートを設定
        get :followings, on: :member
        get :followers, on: :member
      end
      # 認証
      post "login", to: "authentication#login"

      resources :password_resets, only: [:new, :create, :edit, :update]
      # updateアクションにのみカスタムルートを追加(通常idを要求されるがトークンuserを見つけるため)
      put "password_resets", to: "password_resets#update"
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