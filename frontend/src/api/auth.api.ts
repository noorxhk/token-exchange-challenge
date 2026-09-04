async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  })

  const data = (await response.json()) as T & { error?: string }
  if (!response.ok) {
    throw new Error(data.error || "Request failed")
  }

  return data
}

export function issueDemoToken() {
  return request<{ accessToken: string }>("/api/auth/demo-token", {
    method: "POST",
  })
}

export function createShortCode(accessToken: string) {
  return request<{ shortCode: string }>("/api/auth/short-code", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
  })
}

export function loginWithShortCode(shortCode: string) {
  return request<{ authCode: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ shortCode }),
  })
}

export function exchangeAuthCode(authCode: string) {
  return request<{ token: string }>("/api/auth/token", {
    method: "POST",
    body: JSON.stringify({ authCode }),
  })
}

export function me(token: string) {
  return request<{ user: { id: string; email: string; name: string } }>(
    "/api/auth/me",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}
