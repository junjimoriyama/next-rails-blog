export const getCookie = (name: string) => {
  // document.cookie を取得し、クッキーの前に `; ` を追加
  // これは、目的のクッキーが先頭にある場合に問題なく分割できるようにするため
  const value = `; ${document.cookie}`;
  // クッキー名で分割する。`; クッキー名=` というパターンで分割することで、指定したクッキーを見つける
  // parts[0] はクッキー名の前の部分、parts[1] にはクッキーの値が含まれている
  const parts = value.split(`; ${name}=`);
  // 分割した結果、2つの要素があれば（指定されたクッキーが存在する場合）
  if (parts.length === 2) {
    // 配列の最後の要素（クッキーの値とその後に続く他のクッキーたち）を取得
    // それを `;` で再度分割し、最初の部分（目的のクッキーの値）を返す
    // pop() は配列の最後の要素を取り出し、split(';') で他のクッキーと分離し、shift() で最初の値を返す
    return parts.pop()?.split(';').shift();
  }
};
