import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = { name: "", allTowns: [], town: "" }

const BusinessInfo = () => {
  const [towns, setTowns] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setRedirect(true)
    }
    async function fetchTownData() {
      try {
        const { data } = await formGetData(
          "/town/all",
          localStorage.getItem("token")
        )
        setTowns(data.towns)
        // towns &&
        //   towns.map(
        //     (town, index) => (initialValues.allTowns[index] = town.name)
        //   )
        // initialValues.allTowns = data.towns
        console.log(initialValues)
        setError(null)
      } catch (err) {
        // setError(err.response)
      }
    }
    fetchTownData()
  }, [])
  function handleChange(id) {
    console.log(id)
  }
  function validate(values) {
    const errors = {}
    // if (values.towns.length < 1) {
    //   errors.description = "Required"
    // }
    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    try {
      const resData = await formPostData(
        "/town",
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
      //   console.log(resData.data.tourGuide._id)
      //   setId(resData.data.tourGuide._id)
      //   localStorage.setItem("id", resData.data.tourGuide._id)
    } catch (err) {
      // setError(err.response.data.name)
      console.log(err.response)
    }
    setClicked(true)
    setRedirect(true)
  }
  towns && console.log(towns)
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
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="Towns"
          >
            {towns &&
              towns.map((town, index) => (
                <div key={town._id}>
                  <Field name={`town${index}`} className="form-control" />
                  <br />
                </div>
              ))}
            <br />
            <label className="mt-3" htmlFor="description">
              Town Name:
            </label>
            <Field name="name" id="name" className="form-control" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />

            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default BusinessInfo
