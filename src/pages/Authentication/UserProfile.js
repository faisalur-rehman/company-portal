import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Row,
} from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { Redirect, withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import historyPush from "pages/HistoryPush/HistoryPush"

const UserProfile = props => {
  const [redirect, setRedirect] = useState(false)
  // const [contactNo, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  // this.state = { email: "", name: "", idx: 1, contact: "", address: "" }

  useEffect(() => {
    // if (!localStorage.getItem("firstLoad")) {
    //   localStorage.setItem("firstLoad", true)
    //   window.location.reload()
    // } else {
    //   localStorage.removeItem("firstLoad")
    // }
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company/me`,
          localStorage.getItem("token")
        )
        if (data.profile) {
          // setContact(data.profile.contactNo)
          setAddress(data.profile.address)
          setCountry(data.profile.country)
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

  async function handleValidSubmit(event, values) {
    console.log(values)
    try {
      const resData = await patchData(
        "/company/profile",
        values,
        localStorage.getItem("token")
      )
      // setError(null)
      console.log(resData)
      setRedirect(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* <Breadcrumb title="" breadcrumbItem="Profile" /> */}

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}
            </Col>
          </Row>

          <Card style={{ width: "60%", margin: "auto" }}>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => handleValidSubmit(e, v)}
              >
                <div className="form-group">
                  <br />
                  <AvField
                    name="address"
                    label="Address"
                    value={address}
                    className="form-control select"
                    placeholder="Enter Address"
                    type="text"
                    required
                  />
                  <br />
                  {/* <AvField
                    name="contactNo"
                    label="Contact Number"
                    value={contactNo}
                    className="form-control select"
                    placeholder="Enter contact Number"
                    type="number"
                    required
                  />
                  <br /> */}
                  <AvField
                    name="country"
                    label="Country"
                    value={country}
                    className="form-control select"
                    placeholder="Enter country"
                    type="text"
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    color="primary"
                    className="button-color btn btn-block waves-effect waves-light"
                    // onClick={() => setRedirect(true)}
                  >
                    Submit
                  </button>
                </div>
                {redirect && historyPush("/postJob")}
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

const mapStateToProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateToProps, { editProfile, resetProfileFlag })(UserProfile)
)
