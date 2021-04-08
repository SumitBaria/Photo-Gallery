import { Grid } from "@material-ui/core";

import React, { useEffect, useState } from "react";
import UploadButton from "./UploadButton/UploadButton";
import { db, auth } from "../../../firebase";
import "../../../Styles/ImageCard.css";
import ViewImage from "./ViewImage/ViewImage";

const ImageCard = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    db.collection("images")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setImages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data(),
          }))
        );
        console.log(snapshot);
      });
  }, []);

  return (
    <div className="imageCardMain">
      <div className="imageCardUploadButton">
        <UploadButton />
      </div>
      <Grid container spacing={3} className="cardGridList">
        {images.map(({ id, image }) => {
          if (image.user == auth.currentUser.displayName) {
            return (
              <Grid item xs={6} sm={6} md={3} className="cardGridTile" key={id}>
                {/* <div>

                </div>
                <img
                  src={image.photoUrl}
                  alt={image.caption}
                  className="cardGridImage"
                  key={id}
                />

                <GridListTileBar
                  title={image.caption}
                  titlePosition="top"
                  actionIcon={
                    <IconButton
                      className="iconBtn"
                      aria-label={`star ${image.caption}`}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                  className="cardTileBar"
                /> */}

                <ViewImage photoUrl={image.photoUrl} caption={image.caption} />
              </Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
};

export default ImageCard;
