import React from "react"
import "./AdminView.css"

function AdminView() {
  let companyView = [
    {
      name: "company1",
      email: "company@gmail.com",
      status: "Pending",
    },
    {
      name: "company2",
      email: "company2@gmail.com",
      status: "Approved",
    },
    {
      name: "company3",
      email: "company3@gmail.com",
      status: "Declined",
    },
    {
      name: "company4",
      email: "company4@gmail.com",
      status: "Pending",
    },
    {
      name: "company5",
      email: "company5@gmail.com",
      status: "Approved",
    },
  ]

  return (
    <div className="page-content companies">
      <h3>Companies Listing:</h3>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
        {companyView.map((company, index) => (
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

export default AdminView
