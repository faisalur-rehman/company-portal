import React, { useState, useEffect } from "react"
import "./JobsFeed.css"
import { Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

const CompanyJob = props => {
  // let jobFeed = [
  //   {
  //     title: "Custom Realtime React Dashboard",
  //     description:
  //       "We are looking to find a senior front-end React developer who has extensive experience in building scalable, realtime web applications. You will be working closely alongside our team of 10 full-time front-end and back-end engineers.",
  //     salary: "$1500",
  //     address: "Lahore",
  //     timings: "30 hours/Week",
  //     city: "Lahore",
  //     country: "Pakistan",
  //     jobType: "Full Time",
  //     isRemoteJob: "Yes",
  //   },
  // ]
  const [job, setJob] = useState({})
  const [first, setFirst] = useState()
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company-post/third-form/${props.location.state.id}`,
          localStorage.getItem("token")
        )
        const first = await formGetData(
          `/company-post/first-form/${props.location.state.id}`,
          localStorage.getItem("token")
        )
        console.log(first.data)
        setFirst(first.data.post)
        if (data.post) {
          // initialValues.jobDescription = data.post.jobDescription
          // // initialValues.jobTitle = data.tourGuide.jobTitle
          // initialValues = { ...data.post }
          // setValues({ ...data.post })
          // if (value) initialValues = { ...value }
          setJob(data.post)
        }
        // setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  console.log(job)
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          {/* <div className="col-sm-6"></div> */}
          <div className="job" style={{ minHeight: "70vh", width: "75%" }}>
            <h3>Your Job Posting</h3>
            <hr />
            {first && job && (
              <div>
                <h3 className="title">{first.jobTitle}</h3>
                <p className="city">{first.location}</p>
                <Button style={{ marginLeft: 8 }} color="primary">
                  Apply for this Job
                </Button>
                <h5>Salary($): {job.salaryRangeFrom}</h5>
                <p className="description">{job.jobDescription}</p>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Number of Hires:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {first.noOfHires}
                    </span>
                  </p>
                  <p>
                    Remote Job:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {first.isRemoteJob ? " Yes" : " No"}
                    </span>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Job Type:{" "}
                    <span style={{ fontWeight: "bold" }}>{job.empType}</span>
                  </p>
                  <p>
                    Job Type:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {job.contractType}
                    </span>
                  </p>
                </div>
                {/* <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Salary Starting:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {job.salaryRangeFrom}
                    </span>
                  </p>
                </div>*/}
                <hr />
              </div>
            )}
          </div>
          <div
            className="job"
            style={{ width: "75%", marginTop: 30, minHeight: "50vh" }}
          >
            <h3 style={{ marginBottom: 30 }}>Application Setting</h3>
            <div
              style={{
                border: "1px solid black",
                borderRadius: 8,
                width: "90%",
                margin: "auto",
              }}
            >
              <div className="app-statement">
                <h3>Send application to following Email</h3>
                <p>{job.receiveApplication}</p>
              </div>
              <div className="app-statement">
                <h3>Resume Required</h3>
                <p>{job.canSubmitResume}</p>
              </div>
              <div className="app-statement" style={{ marginBottom: 20 }}>
                <h3>Application Deadline</h3>
                <p>{job.plannedDate ? job.plannedDate : "No deadline"}</p>
              </div>
              {/* <div className="app-statement">
              <h3></h3>
              <p></p>
            </div> */}
            </div>
          </div>
        </div>
        {/* <div className="col-sm-2"></div> */}
      </div>
    </div>
  )
}

export default CompanyJob
