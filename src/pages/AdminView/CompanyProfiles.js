import React, { useState, useEffect } from "react"
import "./AdminView.css"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Redirect } from "react-router"
import historyPush from "pages/HistoryPush/HistoryPush"

function AdminView() {
  const [companyView, setCompanies] = useState([])
  const [id, setId] = useState()
  const [redirect, setRedirect] = useState(false)
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
  function handleRedirect(index) {
    setId(companyView[index]._id)
    setRedirect(true)
  }
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
            <tr key={index} onClick={() => handleRedirect(index)}>
              <td>{company.contactNo}</td>
              <td>{company.address}</td>
              {company.isApproved ? <td>Approved</td> : <td>Not Approved</td>}
            </tr>
            // </Link>
          ))}
        </tbody>
      </table>
      {redirect && historyPush("/companyDetail", id)}
    </div>
  )
}

export default AdminView
