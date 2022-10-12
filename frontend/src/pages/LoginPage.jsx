import React from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import "./LoginPage.css"

const LoginPage = () => {
  const { loginUser, registerUser } = useContext(AuthContext)

  return (
    <div className="login-page__container">
      <div className="login__container">
        <h1>Log in</h1>
        <form className="login__form" onSubmit={loginUser}>
          <input type="email" name="email" placeholder="E-mail addres" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Log in</button>
        </form>
      </div>

      <div className="register__container">
        <h1>Create an account</h1>
        <form className="register__form" onSubmit={registerUser}>
          <input type="text" name="first_name" placeholder="Name" />
          <input type="email" name="email" placeholder="E-mail address" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
