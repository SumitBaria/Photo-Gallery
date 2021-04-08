import React, { useState } from "react";
import "../../Styles/Signup.css";

import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import { auth, provider } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,

    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Signup = ({ open = true, close = false }) => {
  const classes = useStyles();
  const [openSignup, setOpenSignup] = useState(true);
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  const signup = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      authUser.user
        .updateProfile({
          displayName: name,
        })
        .catch((error) => alert(error.message));
    });

    setOpenSignup(false);
  };

  const handleGoogleSignup = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => alert(error.message));
    setOpenSignup(false);
  };

  return (
    <div>
      <Modal
        open={open && openSignup}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="signUpModal"
      >
        <div className={classes.paper}>
          <>
            <h2 className="modalHeader">Sign Up</h2>
            <div className="modalMainBody">
              <form className="modalForm">
                <FormGroup>
                  <FormControl>
                    <InputLabel htmlFor="name-input">Name</InputLabel>
                    <Input
                      id="name-input"
                      aria-describedby="name-helper-text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="name-input">Email</InputLabel>
                    <Input
                      type="email"
                      id="email-input"
                      aria-describedby="email-helper-text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="name-input">Password</InputLabel>
                    <Input
                      type="password"
                      id="password-input"
                      aria-describedby="password-helper-text"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <TextField
                      id="date"
                      label="Birthday"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>
                </FormGroup>
                <div className="modalbtnmain">
                  <Button
                    color="primary"
                    className="modalbtn"
                    size="large"
                    onClick={signup}
                  >
                    Sign Up
                  </Button>
                </div>
                <span className="modaldivider">OR</span>
                <div className="modalGoogleBtnMain">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="modalGoogleBtn"
                    size="large"
                    onClick={handleGoogleSignup}
                  >
                    Signin With Google
                  </Button>
                </div>
              </form>
            </div>
          </>
        </div>
      </Modal>
    </div>
  );
};

export default Signup;
