import React from "react"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { ReactComponent as AddIcon } from "../images/add-icon.svg"
import "./NewTask.css"
const NewTask = () => {
  const { authTokens } = useContext(AuthContext)
  const [task, setTask] = useState()

  const changeTask = (value) => {
    setTask((task) => ({
      ...task,
      body: value,
    }))
  }

  const createTask = async () => {
    await fetch("http://127.0.0.1:8000/api/create-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
      body: JSON.stringify(task),
    })
    window.location.reload(false)
  }

  useEffect(() => {
    console.log("new task")
  }, [])

  return (
    <div className="new-task-container">
      <AddIcon className="add-icon" onClick={createTask} />
      <textarea
        className="new-task-text resize-none"
        align="middle"
        onChange={(e) => {
          changeTask(e.target.value)
        }}
      ></textarea>
    </div>
  )
}

export default NewTask
