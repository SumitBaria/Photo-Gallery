import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  GridListTileBar,
  Modal,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";

const ViewImage = ({ photoUrl, caption }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Card className="mainCardContainer" elevation={3} onClick={handleOpen}>
        <CardActionArea>
          <CardMedia className="mainCardMedia">
            <img src={photoUrl} alt={caption} className="cardGridImage" />
          </CardMedia>

          <CardContent className="cardOverlay">
            <Typography gutterBottom className="mainBodyCardTitle">
              {caption}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="imageModel"
      >
        <div className="paper">
          <GridListTileBar
            titlePosition="top"
            actionIcon={
              <IconButton className="cardModalIcon">{caption}</IconButton>
            }
            actionPosition="left"
            className="cardModalOverlay"
          />
          <img src={photoUrl} alt={caption} className="cardModalImage" />
        </div>
      </Modal>
    </div>
  );
};

export default ViewImage;
