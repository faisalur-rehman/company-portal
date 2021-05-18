import React, { useEffect, useState } from "react"

const AdminWelcome = () => {
  const [state, setState] = useState("")
  useEffect(() => {
    if (!localStorage.getItem("firstLoad")) {
      localStorage.setItem("firstLoad", true)
      window.location.reload()
    } else {
      localStorage.removeItem("firstLoad")
    }
    setState("updated")
  }, [])
  return (
    <div className="page-content">
      <h1>Welcome to Admin Panel</h1>
    </div>
  )
}

export default AdminWelcome
