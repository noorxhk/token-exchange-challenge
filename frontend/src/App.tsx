import { Link, Navigate, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import ExchangePage from "./pages/ExchangePage"
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <main>
      <h1>Token Exchange Challenge</h1>
      <nav>
        <Link to="/">Short code</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ExchangePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}

export default App
