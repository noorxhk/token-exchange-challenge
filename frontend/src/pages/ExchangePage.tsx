import { FormEvent, useState } from "react"
import { createShortCode, issueDemoToken } from "../api/auth.api"

function ExchangePage() {
  const [accessToken, setAccessToken] = useState("")
  const [shortCode, setShortCode] = useState("")
  const [error, setError] = useState("")

  const requestDemoToken = async () => {
    setError("")
    try {
      const data = await issueDemoToken()
      setAccessToken(data.accessToken)
    } catch (requestError) {
      setError((requestError as Error).message)
    }
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    try {
      const data = await createShortCode(accessToken)
      setShortCode(data.shortCode)
    } catch (requestError) {
      setError((requestError as Error).message)
    }
  }

  return (
    <section>
      <h2>Access token to short code</h2>
      <button type="button" className="secondary" onClick={requestDemoToken}>
        Get demo access token
      </button>
      <form onSubmit={onSubmit}>
        <label htmlFor="accessToken">Access token</label>
        <textarea
          id="accessToken"
          value={accessToken}
          onChange={(event) => setAccessToken(event.target.value)}
        />
        <button type="submit">Request short code</button>
      </form>
      {shortCode ? <code>{shortCode}</code> : null}
      {error ? <p className="error">{error}</p> : null}
    </section>
  )
}

export default ExchangePage
