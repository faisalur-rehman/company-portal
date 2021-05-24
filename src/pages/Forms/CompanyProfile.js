import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  address: "",
  contactNo: "",
  country: "",
}

const CompanyProfile = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company/me`,
          localStorage.getItem("token")
        )
        if (data.profile) {
          initialValues.address = data.profile.address
          initialValues.contactNo = data.profile.contactNo
          initialValues.country = data.profile.country
          setValues(initialValues)
        }
        console.log(data)
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.contactNo) {
      errors.contactNo = "Required"
    }
    if (!values.address) {
      errors.address = "Required"
    }
    if (!values.country) {
      errors.country = "Required"
    }

    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    try {
      const resData = await patchData(
        "/company/profile",
        data,
        localStorage.getItem("token")
      )
      // setError(null)
      console.log(resData)
    } catch (err) {
      console.log(err.response)
    }
    setRedirect(true)
  }
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Col sm={8}>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="Company Details"
          >
            <label className="mt-3" htmlFor="address">
              Address:
            </label>
            <Field
              name="address"
              id="address"
              className="form-control"
              placeholder="Enter location/address"
            />
            <ErrorMessage
              name="address"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="contactNumber">
              Contact Number:
            </label>
            <Field
              name="contactNo"
              id="contactNumber"
              className="form-control"
              placeholder="Enter Contact Details"
            />
            <ErrorMessage
              name="contactNo"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="contactType">
              Country:
            </label>
            <Field
              name="country"
              id="contactType"
              className="form-control"
              placeholder="Enter Country"
            />
            <ErrorMessage
              name="country"
              component="div"
              style={{ color: "red" }}
            />

            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
            {redirect && <Redirect to="jobDescription" />}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default CompanyProfile
