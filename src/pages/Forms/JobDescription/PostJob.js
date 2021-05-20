import React, { useState } from "react"
import { Button } from "reactstrap"
import "./postJob.css"
import { Redirect } from "react-router-dom"

const PostJob = () => {
  const [redirect, setRedirect] = useState(false)
  return (
    <div className="postJob page-content">
      <h1>Let's make your next great hire. Fast.</h1>
      <h5>You know who you're looking for. We'll help you find them.</h5>
      <Button color="primary" onClick={() => setRedirect(true)}>
        Post a job
      </Button>
      {redirect && <Redirect to="employerData" />}
    </div>
  )
}

export default PostJob
