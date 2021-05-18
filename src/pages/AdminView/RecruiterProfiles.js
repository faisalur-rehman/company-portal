import React from "react"
import "./AdminView.css"

function RecruitersAdminView() {
  let recruitersView = [
    {
      name: "company1",
      email: "company@gmail.com",
      status: "Initialized",
    },
    {
      name: "company2",
      email: "company2@gmail.com",
      status: "Inprogress",
    },
    {
      name: "company3",
      email: "company3@gmail.com",
      status: "Completed",
    },
    {
      name: "company4",
      email: "company4@gmail.com",
      status: "Completed",
    },
    {
      name: "company5",
      email: "company5@gmail.com",
      status: "Initialized",
    },
  ]

  return (
    <div className="page-content companies">
      <h3>Recruiters Listing:</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
        {recruitersView.map((company, index) => (
          // <Link to="/">
          <tr key={index}>
            <td>{company.name}</td>
            <td>{company.email}</td>
            <td>{company.status}</td>
          </tr>
          // </Link>
        ))}
      </table>
    </div>
  )
}

export default RecruitersAdminView
