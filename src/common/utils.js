export async function get(url) {
  const res = await fetch(url, { method: 'GET' })
  return await res.json()
}

export async function post(url, bodyParams) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyParams)
  })
  return await res.json()
}