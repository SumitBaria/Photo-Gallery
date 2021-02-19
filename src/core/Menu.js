import React, { useState, useEffect } from "react";
import "./Menu.css";
import { Modal } from "react-bootstrap";
import { auth, db } from "../firebase";

const Menu = () => {
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        localStorage.setItem("user_id", auth.currentUser.uid);
        localStorage.setItem("username", username);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signup = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpenSignup(false);
  };

  const signin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  return (
    <div className="menu">
      <Modal
        size="sm"
        show={openSignup}
        onHide={() => {
          setOpenSignup(false);
        }}
        centered
        className="menu__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal__title">Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="menu__modalbody">
          <form className=" menu__form">
            <div className="form-group row m-1">
              <div className="col-sm-5">
                <label>FirstName:</label>
                <input
                  type="First Name"
                  className="form-control  first-name"
                  placeholder="Enter Firstname"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></input>
              </div>
              <div className="col-sm-5">
                <label>Lastname:</label>
                <input
                  type="Last Name"
                  className="form-control  last-name"
                  placeholder="Enter Lastname"
                ></input>
              </div>
            </div>
            <div className="form-group m-3 ">
              <label>EMail:</label>
              <input
                type="email"
                className="form-control  col-sm-9"
                placeholder="Enter E-mail Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group m-3">
              <label>Password:</label>
              <input
                type="email"
                className="form-control  col-sm-9"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group m-3">
              <label>Date Of Birth:</label>
              <input
                type="date"
                className="form-control  col-sm-9"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <div className="modal__btn ">
            <button
              className="btn btn-warning mr-3"
              onClick={() => {
                setOpenSignin(true);
                setOpenSignup(false);
              }}
            >
              Sign In
            </button>
            <button className="btn btn-primary" onClick={signup}>
              Sign Up
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openSignin}
        onHide={() => {
          setOpenSignin(false);
        }}
        centered
        className="menu__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal__title">Login </Modal.Title>
        </Modal.Header>
        <Modal.Body className="menu__modalbody">
          <form className=" menu__form">
            <div className="form-group  d-flex justify-content-center">
              <input
                type="email"
                className="form-control  col-sm-9"
                placeholder="Enter E-mail Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group  d-flex justify-content-center">
              <input
                type="email"
                className="form-control  col-sm-9"
                placeholder="Enter Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
          </form>
          <div className="modal__btn ">
            <button
              className="btn btn-warning"
              onClick={() => {
                setOpenSignup(true);
                setOpenSignin(false);
              }}
            >
              Sign Up
            </button>
            <button className="btn btn-primary mr-3" onClick={signin}>
              Sign In
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <nav className="navbar navbar-expan-lg navbar-light bg-light">
        <ul className="navbar-nav ml-auto">
          {user ? (
            <button
              type="button"
              className="btn btn-primary "
              onClick={() => {
                localStorage.removeItem("user_id");
                auth.signOut();
              }}
            >
              SignOut
            </button>
          ) : (
            <div>
              <button
                type="button"
                className="btn btn-primary mr-3 "
                onClick={() => {
                  setOpenSignup(true);
                }}
              >
                Signup
              </button>
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={() => {
                  setOpenSignin(true);
                }}
              >
                Signin
              </button>
            </div>
          )}
        </ul>
        <hr />
      </nav>
    </div>
  );
};

export default Menu;
