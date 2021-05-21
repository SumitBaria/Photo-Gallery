import { Button, Container, Grid } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { auth } from "../../firebase";
import "../../Styles/Main.css";
import Signin from "../Header/Signin";
import Signup from "../Header/Signup";
import ImageCard from "./ImageCard/ImageCard";

const Main = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleSignupClose = () => {
    setOpenSignup(false);
  };

  const handleSigninClose = () => {
    setOpenSignin(false);
  };

  return (
    <div className="mainContainer">
      <Container maxWidth="lg">
        {user ? (
          <div className="mainImageCardComponent">
            <ImageCard />
          </div>
        ) : (
          <Fragment>
            <div className="mainContainerTopPart">
              <div className="mainHeader">What is this for?</div>
              <Grid container spacing={3} className="mainGrid">
                <Grid item md={8}>
                  <p className="mainParagraph">
                    This application is to store the photos online. We can't
                    store our all photos on our hardisk, pen drive, laptop or
                    computer because some day they will destroid and we cant
                    retrive that photos. So because of this problems we are gone
                    introduce our online Photo Gallary Which will help ypu to
                    store photos online. You can see them anytime and on any
                    laptop or phone or computer and anywhere.
                  </p>
                </Grid>
                <Grid item md={4}>
                  <img
                    src="https://st.depositphotos.com/1005979/2522/i/950/depositphotos_25225541-stock-photo-what-word-question-mark-3d.jpg"
                    className="mainImage"
                  />
                </Grid>
              </Grid>
            </div>

            <div className="mainContainerBottomPart">
              <div className="mainHeaderBottom">If you didn't signup</div>
              <div className="mainContainerBottomPartButtons">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    setOpenSignup(true);
                  }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    setOpenSignin(true);
                  }}
                >
                  Sign In
                </Button>
              </div>
              <Signup open={openSignup} close={handleSignupClose} />
              <Signin open={openSignin} close={handleSigninClose} />
            </div>
          </Fragment>
        )}
      </Container>
    </div>
  );
};

export default Main;
