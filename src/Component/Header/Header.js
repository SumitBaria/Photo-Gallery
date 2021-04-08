import React, { Fragment, useState, useEffect } from "react";
import "../../Styles/Header.css";

import { Button, makeStyles, Modal } from "@material-ui/core";
import Signup from "./Signup";
import Signin from "./Signin";
import { auth } from "../../firebase";

const Header = () => {
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

  const handleSignOut = () => {
    auth.signOut();
    window.location.reload();
  };

  return (
    <div className="headerMainContainer">
      <div className="headerBrandLogo">The Photobook</div>
      <div className="headerButtons">
        {!user ? (
          <Fragment>
            <Button
              color="primary"
              size="large"
              onClick={() => {
                setOpenSignup(true);
              }}
            >
              Sign Up
            </Button>
            <Button
              color="primary"
              size="large"
              onClick={() => {
                setOpenSignin(true);
              }}
            >
              Log In
            </Button>
          </Fragment>
        ) : (
          <Button color="primary" size="large" onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </div>

      <Signup open={openSignup} close={handleSignupClose} />
      <Signin open={openSignin} close={handleSigninClose} />
    </div>
  );
};

export default Header;
