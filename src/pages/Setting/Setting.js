import React, { useState } from "react"
import "./Setting.css"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

const Setting = props => {
  const { buttonLabel, className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div className="page-content">
      <div>
        <ul>
          <li className="listing">
            <button onClick={() => setModal(true)}>Notifications </button>
          </li>
          <li className="listing">
            <button onClick={() => setModal(true)}>Security</button>
          </li>
          <li className="listing">
            <button onClick={() => setModal(true)}>Terms and Conditions</button>
          </li>
          <li className="listing">
            <button onClick={() => setModal(true)}>Privacy Policy</button>
          </li>
        </ul>
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Setting</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Settings
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Setting
