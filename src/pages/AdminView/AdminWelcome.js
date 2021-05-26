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
      <button
        className="m-3 button-color btn btn-block waves-effect waves-light"
        color="primary"
        onClick={() => setRedirect(true)}
      >
        See Companies
      </button>
      {redirect && <Redirect to="adminView" />}
    </div>
  )
}

export default AdminWelcome
