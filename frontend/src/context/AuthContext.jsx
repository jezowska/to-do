import { useState, createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  )
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  )
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()

    let response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })

    const data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem("authTokens", JSON.stringify(data))
      navigate("/")
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }

  const logoutUser = () => {
    setUser(null)
    setAuthTokens(null)
    localStorage.removeItem("authTokens")
    navigate("/login")
  }

  const registerUser = async (e) => {
    e.preventDefault()

    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: e.target.first_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })

    const data = await response.json()

    if (response.status !== 201) {
      alert("Error: " + response.status)
    }
  }

  const updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    })

    let data = await response.json()

    if (response.status === 200) {
      setAuthTokens(data)
      console.log("Token updated successfully")
      setUser(jwt_decode(data.access))
      localStorage.setItem("authTokens", JSON.stringify(data))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, fourMinutes)

    return () => clearInterval(interval)
  }, [authTokens, loading])

  const contextData = {
    loginUser: loginUser,
    user: user,
    authTokens: authTokens,
    logoutUser: logoutUser,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
  }
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
