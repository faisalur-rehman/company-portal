import React from "react"
import { Row, Col, Container } from "reactstrap"
import VerticalLinearStepper from "./Stepper"

const Step1 = ({ active }) => {
  const steps = [
    "Introduction",
    "General Information",
    "Tour Milan",
    "Meet Point",
    "FAQ's",
  ]
  return (
    <div className="">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <VerticalLinearStepper active={active} step={steps} />
          </li>
        </ol>
      </nav>
    </div>
  )
}

export default Step1
