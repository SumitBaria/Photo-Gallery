import React, { useState, useEffect, Fragment } from "react";
import Base from "./Base";
import Card from "./Card";
import "./Home.css";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";

const Home = () => {
  const [user, setUser] = useState(null);
  const [photos, setPhoto] = useState([]);

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

  useEffect(() => {
    db.collection(localStorage.getItem("user_id"))
      // .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPhoto(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            photo: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <Base classname="home">
      <div className="container mt-4">
        {!user && (
          <Fragment>
            <div className="home__component1 display-4">
              What is in this for?
            </div>
            <div className="row">
              <div className="col-sm-8">
                <p className="lead mt-3 ml-5">
                  This application is to store the photos online. We can't store
                  our all photos on our hardisk, pen drive, laptop or computer
                  because some day they will destroid and we cant retrive that
                  photos. So because of this problems we are gone introduce our
                  online Photo Gallary Which will help ypu to store photos
                  online. You can see them anytime and on any laptop or phone or
                  computer and anywhere.
                </p>
              </div>
              <div className="col-sm-4 ">
                <img
                  src="https://st.depositphotos.com/1005979/2522/i/950/depositphotos_25225541-stock-photo-what-word-question-mark-3d.jpg"
                  className="home__image"
                />
              </div>
            </div>

            <hr />

            <div className="home__component1 display-4 mt-4 text-right">
              How You Can Use This?
            </div>
            <div className="row">
              <div className="col-sm-4">
                <img
                  src="https://st.depositphotos.com/1005979/2522/i/600/depositphotos_25225463-stock-photo-how-word-asking-question-mark.jpg"
                  className="home__image"
                />
              </div>
              <div className="col-sm-8">
                <p className="lead mt-3 mr-5">
                  You Just have signup and after singup you have to click on
                  upload Button this we open upload form you just have to upload
                  your photo at that point and then write a decription about you
                  photo so that you can also store your memmories related to the
                  photos. Then just click on the upload button that will upload
                  you Photo and you can see you photo on the home page. when you
                  click on that photo you can see that in big picture
                </p>
              </div>
            </div>

            <hr />
          </Fragment>
        )}

        {user && (
          <Fragment>
            <div className="home__uploadbtn">
              <Link to="upload" className="btn btn-primary mb-5">
                Upload
              </Link>
            </div>
            <div className="row">
              <div className="col-sm-4 mb-5">
                {photos.map(({ id, photo }) => (
                  <Card
                    key={id}
                    photoID={id}
                    user={user}
                    imageURL={photo.imageURL}
                    desc={photo.desc}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Base>
  );
};

export default Home;
