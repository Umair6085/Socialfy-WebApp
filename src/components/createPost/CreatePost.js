import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/slices/feedSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 as uuidv4 } from 'uuid';
import Button from "../button/Button";
import Spinner from "../spinner/Spinner";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const user = useSelector(store => store.authSlice.user);
  const post = useSelector((store) => store.feedSlice.updatePost);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [post]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPostHandler = () => {
    if (!validateForm()) return;

    const postData = { 
      uid: user.uid,
      title, 
      description, 
      imageURL 
    };

    if (post) {
      dispatch(updatePost({ ...postData, id: post.id }));
      return;
    }

    dispatch(createPost({ ...postData, file, setLoading }))
      .then(() => {
        // Reset the input fields after creating a post
        setTitle("");
        setDescription("");
        setImageURL("");
        setFile(null);
      });
  };

  const changeImage = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const uploadImage = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      const fileRef = ref(storage, "socialAppMedia/" + uuidv4() + "-" + selectedFile.name);
      const metadata = { contentType: selectedFile.type };

      const response = await uploadBytes(fileRef, selectedFile, metadata);
      const url = await getDownloadURL(fileRef);
      setImageURL(url);
    } catch (error) {
      console.log("Error while uploading file: ", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-12 col-md-8 col-lg-6 ms-auto me-auto">
          <h3>{post ? "Update Post" : "Create Post"}</h3>

          <input
            type="text"
            value={title}
            className={`form-control m-1 ${errors.title ? "is-invalid" : ""}`}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}

          <textarea
            className={`form-control m-1 ${errors.description ? "is-invalid" : ""}`}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}

          <input
            className={`form-control m-1 ${errors.file ? "is-invalid" : ""}`}
            type="file"
            id="formFile"
            onChange={(e) => {
              changeImage(e);
              uploadImage(e);
            }}
          />
          {errors.file && <div className="invalid-feedback">{errors.file}</div>}

          {loading ? (
            <Spinner />
          ) : (
            <Button title={post ? "Update Post" : "Create Post"} onClickHandler={createPostHandler} />
          )}
        </div>
      </div>
    </div>
  );
}
