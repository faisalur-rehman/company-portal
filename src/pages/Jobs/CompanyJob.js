import React from "react"
import "./JobsFeed.css"

const CompanyJob = () => {
  let jobFeed = [
    {
      title: "Custom Realtime React Dashboard",
      description:
        "We are looking to find a senior front-end React developer who has extensive experience in building scalable, realtime web applications. You will be working closely alongside our team of 10 full-time front-end and back-end engineers.",
      hourlyRate: "$15",
      address: "Lahore",
      timings: "30 hours/Week",
    },
  ]
  return (
    <div className="page-content">
      <div className="container">
        <div className="row">
          {/* <div className="col-sm-6"></div> */}
          <div className="job" style={{ minHeight: "70vh", width: "75%" }}>
            <h2>Job Feed</h2>
            <hr />
            {jobFeed.map(job => (
              <div>
                <h3>{job.title}</h3>
                <h5>Hourly Rate: {job.hourlyRate}</h5>
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
