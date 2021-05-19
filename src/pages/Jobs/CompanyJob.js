import React from "react"
import "./JobsFeed.css"
import { Button } from "reactstrap"

const CompanyJob = () => {
  let jobFeed = [
    {
      title: "Custom Realtime React Dashboard",
      description:
        "We are looking to find a senior front-end React developer who has extensive experience in building scalable, realtime web applications. You will be working closely alongside our team of 10 full-time front-end and back-end engineers.",
      salary: "$1500",
      address: "Lahore",
      timings: "30 hours/Week",
      city: "Lahore",
      country: "Pakistan",
      jobType: "Full Time",
      isRemoteJob: "Yes",
    },
  ]
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          {/* <div className="col-sm-6"></div> */}
          <div className="job" style={{ minHeight: "70vh", width: "75%" }}>
            <h3>Your Job Posting</h3>
            <hr />
            {jobFeed.map((job, index) => (
              <div key={index}>
                <h3 className="title">{job.title}</h3>
                <p className="city">
                  {job.city}-{job.country}
                </p>
                <Button style={{ marginLeft: 8 }} color="primary">
                  Apply for this Job
                </Button>
                <h5>Salary(monthly): {job.salary}</h5>
                <p className="description">{job.description}</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Location:{" "}
                    <span style={{ fontWeight: "bold" }}>{job.address}</span>
                  </p>
                  <p>
                    Timings/Weekly Hours:{" "}
                    <span style={{ fontWeight: "bold" }}>{job.timings}</span>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>
                    Job Type:{" "}
                    <span style={{ fontWeight: "bold" }}>{job.jobType}</span>
                  </p>
                  <p>
                    Work Remotely:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {job.isRemoteJob}
                    </span>
                  </p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="col-sm-2"></div> */}
      </div>
    </div>
  )
}

export default CompanyJob
