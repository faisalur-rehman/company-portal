import React, { useState, useEffect } from "react"
import { Field, ErrorMessage } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = { hours: "", price: "", duration: "" }

const GeneralInformation = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/tour-guide/${localStorage.getItem("id")}`,
          localStorage.getItem("token")
        )
        if (data.tourGuide) {
          initialValues.hours = data.tourGuide.hours
          initialValues.price = data.tourGuide.price
          initialValues.duration = data.tourGuide.duration
          setValues(initialValues)
        }
        console.log(data)
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.hours) {
      errors.hours = "Required"
    }
    if (!values.price) {
      errors.price = "Required"
    }
    if (!values.duration) {
      errors.duration = "Required"
    }

    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    try {
      const resData = await formPostData(
        "/tour-guide/general-info",
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
    } catch (err) {
      console.log(err.response)
    }
    setClicked(true)
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
        <Step1 active={1} />
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="General Information"
          >
            <label className="mt-3" htmlFor="hours">
              Hours:
            </label>
            <Field
              type="number"
              name="hours"
              id="hours"
              className="form-control"
            />
            <ErrorMessage
              name="hours"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="price">
              Price(in euros):
            </label>
            <Field
              type="number"
              name="price"
              id="price"
              className="form-control"
            />
            <ErrorMessage
              name="price"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="duration">
              Duration:
            </label>
            <Field name="duration" id="duration" className="form-control" />
            <ErrorMessage
              name="duration"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
            {redirect && <Redirect to="tourMilan" />}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default GeneralInformation
