export const baseUrl: string = 'http://localhost:8000/api'

export const postReq = async (url: string, body: string): Promise<any> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  const data = await response.json()

  if (!response.ok) {
    let message: string

    if (data?.message) {
      message = data.message
    } else {
      message = data
    }

    return { error: true, message }
  }

  return data
}
