import React from "react"
import { ReactComponent as TrashIcon } from "../images/trash-icon.svg"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { useEffect } from "react"
import "./Task.css"
const Task = ({ task }) => {
  const { authTokens } = useContext(AuthContext)

  const deleteNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/delete-task/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.access}`,
      },
    })
  }
  useEffect(() => {}, [deleteNote])
  return (
    <div className="task__container">
      {task.completed ? (
        <p className="task">{task.body}</p>
      ) : (
        <p className="task task--completed">{task.body}</p>
      )}
      <TrashIcon className="trash-icon" onClick={deleteNote} />
    </div>
  )
}

export default Task
