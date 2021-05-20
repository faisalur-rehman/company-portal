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

const CompanyDetail = props => {
  const [redirect, setRedirect] = useState(false)
  const [contactNo, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [country, setCountry] = useState("")
  // this.state = { email: "", name: "", idx: 1, contact: "", address: "" }
  console.log(props.location.state.id)
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company/profile/${props.location.state.id}`,
          localStorage.getItem("token")
        )
        if (data.profile) {
          setContact(data.profile.contactNo)
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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="" breadcrumbItem="Profile" />

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

          <Card>
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
                    className="form-control"
                    placeholder="Enter Address"
                    type="text"
                    disabled
                  />
                  <br />
                  <AvField
                    name="contactNo"
                    label="Contact Number"
                    value={contactNo}
                    className="form-control"
                    placeholder="Enter contact Number"
                    type="number"
                    disabled
                  />
                  <br />
                  <AvField
                    name="country"
                    label="Country"
                    value={country}
                    className="form-control"
                    placeholder="Enter country"
                    type="text"
                    disabled
                  />
                </div>
                {/* <div className="text-center mt-4">
                  <Button
                    type="submit"
                    color="primary"
                    onClick={() => setRedirect(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
                {redirect && <Redirect to="postJob" />} */}
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

CompanyDetail.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

const mapStateToProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateToProps, { editProfile, resetProfileFlag })(CompanyDetail)
)
