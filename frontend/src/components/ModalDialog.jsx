import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import logoImg from '../assets/logo.svg';
import './modalDialog.scss';
export default class ModalDialog extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <img src={logoImg} alt="Be The Hero" />
          <Modal.Title id="contained-modal-title-vcenter">
          
          {this.props.maintitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {<h4>{this.props.subtitle}</h4>}
          {this.props.descriptions? this.props.descriptions.map((d, index) => (
            <p key={index}>{d}</p>
          )): <p></p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.props.onHide}
            className="btn hero-button"
            Style="max-width: 120px"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
