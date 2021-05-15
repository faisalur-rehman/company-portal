import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = { startingPoint: "", isTourOnline: "online", town: "" }

const MeetPoint = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [towns, setTowns] = useState([])

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
        if (data.towns) {
          initialValues.town = data.towns[0]._id
          console.log(data)
        }
        setTowns(data.towns)
        setError(null)
      } catch (err) {
        // setError(err.response)`
      }
    }
    fetchTownData()
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/tour-guide/${localStorage.getItem("id")}`,
          localStorage.getItem("token")
        )
        if (data.tourGuide) {
          // initialValues.startingPoint = data.tourGuide.startingPoint
          // initialValues.town = data.tourGuide.town
          if (data.tourGuide.isTourOnline) {
            initialValues.isTourOnline = "online"
          } else {
            initialValues.isTourOnline = "facetoface"
          }
          // setValues(initialValues)
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
    if (!values.startingPoint) {
      errors.startingPoint = "Required"
    }
    return errors
  }

  async function handleSubmit(data) {
    console.log("data", data)
    let newData = {}
    if (data.isTourOnline === "online") {
      newData.isTourOnline = true
      newData.startingPoint = data.startingPoint
      newData.town = data.town
    } else {
      newData = { ...data, isTourOnline: false }
    }
    try {
      const resData = await formPostData(
        "/tour-guide/tour-info",
        newData,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData.data.tourGuide.startingPoint)
      // console.log(resData.data.tourGuide.startingPoint)

      initialValues.town = towns.filter(
        town => town.id === resData.data.tourGuide.town
      )[0]
      initialValues.startingPoint = resData.data.tourGuide.startingPoint
    } catch (err) {
      // setError(err.response.data.name)
      console.log(err.response)
    }
    // if (data.isTourOnline) {
    //   data.isTourOnline = "online"
    // } else {
    //   data.isTourOnline = "facetoface"
    // }
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
        <Step1 active={3} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                {/* {redirect && <Redirect to="faq" />} */}
                <div className="account-pages my-5 pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Introduction !
                                  </h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end">
                                {/* <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                /> */}
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <p>What kind of tour do you offer?</p>
                              <Field as="select" name="isTourOnline">
                                <option value="online">Online</option>
                                <option value="facetoface">Face to face</option>
                              </Field>
                              <ErrorMessage
                                name="isTourOnline"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              <label className="mt-3" htmlFor="startingPoint">
                                Your meeting/starting point:
                              </label>
                              <Field
                                name="startingPoint"
                                id="startingPoint"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="startingPoint"
                                component="div"
                                style={{ color: "red" }}
                              />
                              <br />
                              {values.isTourOnline === "facetoface" && (
                                <>
                                  <label htmlFor="town">Town:</label>
                                  <br />
                                  <Field as="select" name="town">
                                    {towns.map((town, index) => (
                                      <option value={`${town._id}`} key={index}>
                                        {town.name}
                                      </option>
                                    ))}
                                  </Field>
                                  <ErrorMessage
                                    name="town"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </>
                              )}
                              <br />
                              <Button
                                type="submit"
                                className="mt-4"
                                color="primary"
                              >
                                Submit
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default MeetPoint
