class ApplicationJob < ActiveJob::Base
  # Automatically retry jobs that encountered a deadlock
  # retry_on ActiveRecord::Deadlocked

  # Most jobs are safe to ignore if the underlying records are no longer available
  # discard_on ActiveJob::DeserializationError
end

# ここにジョブの中身を記載（新しいファイルを作成する）
# 作ったジョブをコントローラーから呼び出す
