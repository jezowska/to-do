import React from "react"
import AuthContext from "../context/AuthContext"
import { useContext, useState, useEffect } from "react"

import "./HomePage.css"
import Task from "../components/Task"
import NewTask from "../components/NewTask"
const HomePage = () => {
  const { authTokens } = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens?.access),
      },
    })
    console.log("Auth token (from home): ", authTokens)
    const data = await response.json()
    setTasks(data)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className="home-page__container">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}

      <NewTask />
    </div>
  )
}

export default HomePage
