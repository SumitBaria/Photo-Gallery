import React, { useState } from "react";
import "../../Styles/Signin.css";
import { auth, provider } from "../../firebase";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  makeStyles,
  Modal,
} from "@material-ui/core";

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

const Signin = ({ open = true, close = false }) => {
  const [openSignin, setOpenSignin] = useState(true);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const signin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  const handleGoogleSignin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => alert(error.message));

    // setOpenSignin(false);
  };

  return (
    <div>
      <Modal
        open={open && openSignin}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="signInModel"
      >
        <div className={classes.paper}>
          <>
            <h2 className="modalHeader">Sign In</h2>
            <div className="modalMainBody">
              <form className="modalForm">
                <FormGroup>
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
                </FormGroup>
                <div className="modalbtnmain">
                  <Button
                    color="primary"
                    className="modalbtn"
                    size="large"
                    onClick={signin}
                  >
                    Sign In
                  </Button>
                </div>
                <span className="modaldivider">OR</span>
                <div className="modalGoogleBtnMain">
                  <Button
                    variant="contained"
                    color="secondary"
                    className="modalGoogleBtn"
                    size="large"
                    onClick={handleGoogleSignin}
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

export default Signin;
