import React, { useState } from "react";
import "./Card.css";
import { Modal, Button } from "react-bootstrap";

const Card = ({ photoID, user, imageURL, desc }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card__main">
      <Modal show={show} onHide={handleClose} centered className="card__modal">
        <Modal.Body className="card__modalbody">
          <img src={imageURL} className="card-img card__modalimg" alt="" />
          <div className=" card-img-overlay text-white card__modaloverlay">
            <h5 className="card-title card__modaltitle">Date</h5>
            <p className="card-text">{desc}</p>
          </div>
        </Modal.Body>
      </Modal>
      <div className="card mb-3">
        <img src={imageURL} className="card-img" alt="" />
        <div
          className=" card-img-overlay text-white card__overlay"
          onClick={handleShow}
        >
          <h5 className="card-title">Date</h5>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
