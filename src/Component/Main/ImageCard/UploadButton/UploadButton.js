import {
  Button,
  FormControl,
  Input,
  InputLabel,
  LinearProgress,
  makeStyles,
  Modal,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, { useState } from "react";
import { auth, db, storage } from "../../../../firebase";
import "../../../../Styles/UploadButton.css";
import firebase from "firebase";

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

const UploadButton = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`images/${image.name}`)
      .put(image)
      .then((snapshot) => {
        console.log(snapshot);
        var progressbar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progressbar);

        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("images").add({
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: desc,
              photoUrl: url,
              user: auth.currentUser.displayName,
            });

            setDesc();
            setImage(null);
            setProgress(0);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="uploadButtonMain">
      <div className="uploadButton">
        <Button
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <AddCircleOutlineIcon />
          <span className="uploadSpan">Upload Image</span>
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="uploadModel"
      >
        <div className={classes.paper}>
          <h2 className="uploadModalHeader">Upload Form</h2>
          <div className="uploadModalMainContainer">
            <div className="uploadModalFileContainer">
              <input
                type="file"
                placeholder="Choose File"
                onChange={handleChange}
              />
            </div>
            <div className="uploadModalAddDescMain">
              <FormControl className="uploadModalAddDesc">
                <InputLabel htmlFor="desc-input">Description</InputLabel>
                <Input
                  id="desc-input"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
            </div>
            <LinearProgress
              variant="determinate"
              value={progress}
              className="uploadModalProgressBar"
            />
            <div className="uploadModalBtn">
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadButton;
