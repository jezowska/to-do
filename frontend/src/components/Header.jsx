import React from "react"
import "./Header.css"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
const Header = () => {
  const { logoutUser, user } = useContext(AuthContext)
  return (
    <div className="header__container">
      <div className="header__wrapper">
        <h1>To Do</h1>
        {user ? <h3 onClick={logoutUser}>Logout</h3> : null}
      </div>
    </div>
  )
}

export default Header
