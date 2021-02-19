import React, { useState } from "react";
import Base from "./Base";
import "./Image.css";
import { db, storage } from "../firebase";
import firebase from "firebase";

const Image = () => {
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  var username = localStorage.getItem("username");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection(localStorage.getItem("user_id")).add({
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              desc: desc,
              imageURL: url,
              username: username,
            });

            setProgress(0);
            setDesc("");
            setImage(null);
          });
      }
    );
  };

  return (
    <Base>
      <div className="upload__main ">
        <form className="upload__form">
          <progress
            className="upload__progress"
            value={progress}
            max="100"
          ></progress>
          <div className="upload__form__div form-group">
            <input
              className="form-control upload-file"
              type="file"
              placeholder="Select File"
              onChange={handleChange}
            ></input>
          </div>
          <div className="upload__form__div form-group">
            <input
              className="form-control"
              type="text"
              placeholder=" Description"
              onChange={(e) => setDesc(e.target.value)}
            ></input>
          </div>
          <div className="upload__btn">
            <button className="btn btn-primary" onClick={handleUpload}>
              upload
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};

export default Image;
