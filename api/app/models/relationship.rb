class Api::V1::Relationship < ApplicationRecord
#  RelationshipとUsersテーブルをfollowingとfollowerという名前で結びつける。
# フォローされているユーザー
belongs_to :following, class_name: "User"
# followerはuserがフォローされている人
belongs_to :follower, class_name: "User"
end





































#  # フォローする側
#  belongs_to :following, class_name: "User"
#  # フォローされる側
#  belongs_to :follower, class_name: "User"