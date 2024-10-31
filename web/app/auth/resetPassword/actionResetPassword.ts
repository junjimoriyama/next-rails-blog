"use server";

export const sendPassword = async (formData: FormData) => {
  const password = formData.get("password");
  const token = formData.get("token");
  console.log('token123----------------',token)

  try {
    const res = await fetch(`http://api:3000/api/v1/password_resets/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: password}),
    });
    if (!res.ok) {
      const errorData = await res.json(); 
      // エラーメッセージが含まれる可能性のあるレスポンスを取得
      console.log(errorData)
      // throw new Error(`Error: ${res.status}, Message: ${errorData.message}`);
    }

    if (res.ok) {
      const data = res.json();
      console.log("dataは-----------", data);
    }
  } catch (error) {
    console.log(error);
  }
};
// リセットパスワード 
// eyJfcmFpbHMiOnsiZGF0YSI6MSwiZXhwIjoiMjAyNC0xMC0zMFQwNDowMjo1OC44NzZaIiwicHVyIjoidXNlci9wYXNzd29yZF9yZXNldCJ9fQ--ff8c1ecd05dd6d17c450de0fbc7c1bcfd4840684f2410f4bde7df8a0c2c316e4

//eyJfcmFpbHMiOnsiZGF0YSI6MSwiZXhwIjoiMjAyNC0xMC0zMFQwNDowMjo1OC44NzZaIiwicHVyIjoidXNlci9wYXNzd29yZF9yZXNldCJ9fQ--ff8c1ecd05dd6d17c450de0fbc7c1bcfd4840684f2410f4bde7df8a0c2c316e4

// eyJfcmFpbHMiOnsiZGF0YSI6MSwiZXhwIjoiMjAyNC0xMC0zMFQwNDowMjo1OC44NzZaIiwicHVyIjoidXNlci9wYXNzd29yZF9yZXNldCJ9fQ--ff8c1ecd05dd6d17c450de0fbc7c1bcfd4840684f2410f4bde7df8a0c2c316e4

// ログイン: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.tX5Z8ZxQWQrUss0bsm8zRjO82f8wPOXhM7aZdGfDoM8

// 関連性について
// このエラー (ActiveSupport::MessageVerifier::InvalidSignature) は、secret_key_base に関連しています。特に、パスワードリセットやその他のトークン署名が正しくない場合に発生します。現在、JWTでトークンを発行しているコードでも secret_key_base を使用していますが、パスワードリセット用トークンとJWTトークンが別の目的で使われているため、同じキーを使用している可能性が高いです。このように、キーが適切に使用されていないか、途中で不一致が発生している場合にエラーが発生します。

// まずは、Rails の secret_key_base 設定を確認し、トークンの生成と検証の際に同じ secret_key_base が使用されていることを確認してください。また、トークンの期限や署名アルゴリズムにも注意する必要があります。


// ko94/iTFaTijxOwCSL3YnCylBdwZTcq8Yd/603YOPFlJlbxfmw5CAUFnDmP3loJcq5NPI7B8EYdgMoMK+QajgyQUSWAc9gwNISCKXpFn3U0UvgvJfK8DgvAqiOC5Jk8GUvxAhZjcexLdutBLmD0fkJvMFZbXQyUQ11zcaAMIiufc2quAivYayrC6eobT98z55E93Gia1EEPuEXlV/vVxQF6aNlQ5oC0TbEFtOuGwLW3lbM8/spA4yD4S0ClP6HuXuZjiQ3KJz1A4GbY+qBn5M26RNv6XH36vErfUr7UColh1tUGmfj7p798tp7nfGbISev3Blnj1cDjxQgYSaZDHzRkGS7R79qqnSHzGiaEL8kyoMCnLHHOpbZutvS/XyQIQV87bIZ3L82IK82LUVkN6xFpB4Xj0--jQKobTEFffHIgfMu--vzwfS54USxIU7yH94iSFeA==



// # aws:
// #   access_key_id: 123
// #   secret_access_key: 345

// # Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
// secret_key_base: f458f1a4e088c00a5994989b02162025130c7b9ee696a0856629be0b9b73f81a7991d5fe9dbbd79d98fe0566cceb5ae92aa3ec7a78148b65bf128ff02c5b0e9e
// moriyamajunji@moriyamajunjinoMacBook-Pro api % 

// f458f1a4e088c00a5994989b02162025130c7b9ee696a0856629be0b9b73f81a7991d5fe9dbbd79d98fe0566cceb5ae92aa3ec7a78148b65bf128ff02c5b0e9e

// f458f1a4e088c00a5994989b02162025130c7b9ee696a0856629be0b9b73f81a7991d5fe9dbbd79d98fe0566cceb5ae92aa3ec7a78148b65bf128ff02c5b0e9e