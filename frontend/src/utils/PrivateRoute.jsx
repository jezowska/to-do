import React from "react"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext)
  console.log(user)
  if (user) {
    return children
  }
  console.log("twoja stara")
  return <Navigate to="/login" />
}

export default PrivateRoute
