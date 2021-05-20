import React, { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { Redirect } from "react-router-dom"

const AdminWelcome = () => {
  const [state, setState] = useState("")
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    // if (!localStorage.getItem("firstLoad")) {
    //   localStorage.setItem("firstLoad", true)
    //   window.location.reload()
    // } else {
    //   localStorage.removeItem("firstLoad")
    // }
    setState("updated")
  }, [])
  return (
    <div className="page-content">
      <h1>Welcome to Admin Panel</h1>
      <Button className="m-3" color="primary" onClick={() => setRedirect(true)}>
        See Companies
      </Button>
      {redirect && <Redirect to="adminView" />}
    </div>
  )
}

export default AdminWelcome
