import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { exchangeAuthCode, loginWithShortCode } from "../api/auth.api"

function LoginPage() {
  const navigate = useNavigate()
  const [shortCode, setShortCode] = useState("")
  const [authCode, setAuthCode] = useState("")
  const [error, setError] = useState("")

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    try {
      const loginData = await loginWithShortCode(shortCode)
      setAuthCode(loginData.authCode)
      const tokenData = await exchangeAuthCode(loginData.authCode)
      sessionStorage.setItem("sessionToken", tokenData.token)
      navigate("/dashboard")
    } catch (requestError) {
      setError((requestError as Error).message)
    }
  }

  return (
    <section>
      <h2>Login with short code</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="shortCode">Short code</label>
        <input
          id="shortCode"
          value={shortCode}
          onChange={(event) => setShortCode(event.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
      {authCode ? <code>{authCode}</code> : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}

export default LoginPage
