import { useEffect, useState } from "react"
import { me } from "../api/auth.api"

type User = {
  id: string
  email: string
  name: string
}

function DashboardPage() {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem("sessionToken")
    if (!token) {
      setError("No session token")
      return
    }

    me(token)
      .then((data) => setUser(data.user))
      .catch((requestError) => setError((requestError as Error).message))
  }, [])

  return (
    <section>
      <h2>Dashboard</h2>
      {user ? (
        <p className="ok">
          Signed in as {user.name} ({user.email})
        </p>
      ) : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}

export default DashboardPage
