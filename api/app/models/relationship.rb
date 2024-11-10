class Relationship < ApplicationRecord
#  RelationshipとUsersテーブルをfollowingとfollowerという名前で結びつける。
# フォローされているユーザー
belongs_to :following, class_name: "User"
# followerはuserがフォローされている人
belongs_to :follower, class_name: "User"

validates :following_id, uniqueness: { scope: :follower_id, message: "すでにフォローしています。" }
end





































#  # フォローする側
#  belongs_to :following, class_name: "User"
#  # フォローされる側
#  belongs_to :follower, class_name: "User"