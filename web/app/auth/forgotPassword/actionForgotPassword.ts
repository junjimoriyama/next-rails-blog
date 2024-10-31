'use server'

export const sendEmail = async(formData: FormData) => {
  
  const email = formData.get('email')

  const res = await fetch('http://api:3000/api/v1/password_resets', {
    // password_resets/createを呼び出す
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email})
  })

  if(res.ok) {
    const data = await res.json()
    console.log('リセット用のメール送れました', data)
  } else {
    console.error('Error:', res.statusText)
  }
}