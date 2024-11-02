class Favorite < ApplicationRecord
  belongs_to :user
  # 自動的に数を更新
  belongs_to :post, counter_cache: true

  validates :user_id, uniqueness: { scope: :post_id, message: "すでにいいねしています。" }
end

# いいね機能実装手順
# ① いいねの作成、削除機能
# rails -----------------------------------------------------------------------
# Favoriteモデルの作成。belongs_toでuserとpostの中間テーブルとして紐付けと特定のuser_idとpost_idの組み合わせが重複しないことを検証するバリデーションの設定。
# 1人のユーザーは複数のいいねを持つ。投稿が削除されたらいいねも削除する。has_many :posts, dependent: :destroy
# 1人のユーザーは複数の投稿を持つ。ユーザーが削除された投稿も削除する。has_many :posts, dependent: :destroy
# FavoritesControllerの作成。createとdestroyの設定。現在のユーザーのpost_idから該当の投稿に対して行う。
# ルートの設定。postsに対して/favoriteとなるようにfor文で入れ込む(resourcesではなくてresourceと単数系で)

# next -----------------------------------------------------------------------
# Favoriteの子コンポーネント作成。その中にconst [ isFavorited, setIsFavorited ] = useState(initialFavorite)のようにisFavoritedで初期値をfalseで定義しこれでUI上の管理を行う。(postsに関する各値は親コンポーネントから取得)
# いいねボタンに対してクリックイベントが発火したらisFavoritedのtrue,falseの状態によって( const method = isFavorited ? "DELETE" : "POST")の様に削除か作成かのメソッドを切り分ける。その結果をsetする。
