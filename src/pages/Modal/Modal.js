import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Modal,
  Container,
} from "reactstrap"

const ModalComponent = () => {
  const [modal_standard, setmodal_standard] = useState(true)
  function tog_standard() {
    props.setModal(!props.open)
    removeBodyCss()
  }
  return (
    <div>
      <Modal
        isOpen={props.open}
        toggle={() => {
          tog_standard()
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            Modal Heading
          </h5>
          <button
            type="button"
            onClick={() => {
              setmodal_standard(false)
            }}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <h5>Overflowing text to show scroll behavior</h5>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </p>
          <p>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={() => {
              tog_standard()
            }}
            className="btn btn-secondary waves-effect"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
          >
            Save changes
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ModalComponent
