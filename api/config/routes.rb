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
      # get 'password/reset', to: 'password_resets#new'
      # フロントからの通知を受け取りまずここが呼ばれる
      # post 'password/reset', to: 'password_resets#create'
      # get 'password/reset/edit', to: 'password_resets#edit'
      # patch "password/reset/edit", to: "password_resets#update"
      resources :password_resets, only: [:new, :create, :edit, :update]
      # newは、ユーザーにフォームを提供してデータ入力を促す画面を表示。
      # createはフォームのデータを受け取り実際にリソースを作成する。
    end
  end

  # /up にアクセスするとアプリの状態を確認でき、正常なら200、異常なら500を返す。
  get "up" => "rails/health#show", as: :rails_health_check

  # Letter Opener Webのルーティング (開発環境のみ
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  # アプリのルートパスを設定する場所。
  # root "posts#index"
end