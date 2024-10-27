'use server'

export const sendEmail = async(formData: FormData) => {
  
  const email = formData.get('email')

  const res = await fetch('http/api:3000/api/v1/')
}