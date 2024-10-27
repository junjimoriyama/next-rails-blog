// 投稿データ
export interface postProps {
  id: number,
  title: string,
  content: string,
  category: {name: string},
  created_at: number,
  user_id: number
}

// DeleteBtnProps: 削除ボタンのためのプロパティ。削除対象のIDを持つ。
export interface DeleteBtnProps {
  id: number;
}

// CategoryProps: カテゴリーのデータ構造。IDと名前を持つ。
export interface CategoryProps {
  id: number;
  name: string;
}

// editPostData: 投稿編集のデータ構造。タイトル、内容、カテゴリーを持つ。
export interface editPostData {
  title: string;
  content: string;
  category_id: number;
}