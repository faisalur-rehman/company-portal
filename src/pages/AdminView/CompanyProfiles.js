import React, { useState, useEffect } from "react"
import "./AdminView.css"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

function AdminView() {
  const [companyView, setCompanies] = useState([])
  useEffect(() => {
    console.log("new")
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company/all`,
          localStorage.getItem("token")
        )
        setCompanies(data.companies)
        // if (data.tourGuide) {
        //   initialValues.hours = data.tourGuide.hours
        //   initialValues.price = data.tourGuide.price
        //   initialValues.duration = data.tourGuide.duration
        //   setValues(initialValues)
        // }
        console.log(data)
        // setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  // let companyView = [
  //   {
  //     name: "company1",
  //     email: "company@gmail.com",
  //     status: "Pending",
  //   },
  //   {
  //     name: "company2",
  //     email: "company2@gmail.com",
  //     status: "Approved",
  //   },
  //   {
  //     name: "company3",
  //     email: "company3@gmail.com",
  //     status: "Declined",
  //   },
  //   {
  //     name: "company4",
  //     email: "company4@gmail.com",
  //     status: "Pending",
  //   },
  //   {
  //     name: "company5",
  //     email: "company5@gmail.com",
  //     status: "Approved",
  //   },
  // ]

  return (
    <div className="page-content companies">
      <h3>Companies Listing:</h3>
      <table>
        <tbody>
          <tr>
            <th>Contact No</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
          {companyView.map((company, index) => (
            // <Link to="/">
            <tr key={index} onClick={() => console.log(index)}>
              <td>{company.contactNo}</td>
              <td>{company.address}</td>
              {company.isApproved ? <td>Approved</td> : <td>Not Approved</td>}
            </tr>
            // </Link>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminView
