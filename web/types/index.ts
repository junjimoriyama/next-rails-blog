// 投稿データ
export interface postProps {
  id: string,
  title: string,
  content: string,
  category: {name: string},
  created_at: string,
}

export interface DeleteBtnProps {
  id: string;
}

export interface CategoryProps {
  id: string;
  name: string;
}