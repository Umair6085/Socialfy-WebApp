import React from "react";
import { useSelector } from "react-redux";

export default function Card(props) {
  const user = useSelector((store) => store.authSlice.user);

  return (
    <>
      <div className="card rounded-3 my-3">
        <div className="card-body position-relative">
          <div className="profile mb-3 d-flex">
            <div
              className="bg-secondary-subtle p-3 rounded-5 d-flex justify-content-center align-items-center"
              style={{ width: "32px", height: "30px" }}
            >
              <i className="bi bi-person-circle fs-2"></i>
            </div>
            <div className="profile-text d-flex flex-column ms-2">
              <h5 className="m-0" style={{ fontSize: "17px" }}>
                User
              </h5>
              <span className="m-0" style={{ fontSize: "11px" }}> 
              { props?.data?.createAt?.seconds ? new Date(props?.data?.createAt?.toDate()).toLocaleDateString() : new Date(props?.data?.createAt).toLocaleDateString()} &nbsp;
                <i className="bi bi-globe-americas"></i>
              </span>
            </div>
          </div>
          <h5 className="card-title">{props?.data?.title}</h5>
          <p className="card-text">{props?.data?.description}</p>
          <div className=" d-flex gap-2 bg-secondary-subtle rounded-5 position-absolute top-0 end-0 mt-3 me-3">
            {/* {props?.data?.uid != user?.uid ? "" : } */}
            <button className="btn text-danger" onClick={props.handleDelete}>
              <i className="bi bi-trash3-fill"></i>
            </button> 

            <button className="btn text-success" onClick={props.handleEdit}>
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>

        <img
          src= {props?.data?.imageURL}
          className="card-img-top"
          alt={props?.data?.title}
        />
        <div className="card-footer-1 px-3 py-2 d-flex justify-content-between">
          <div className="d-flex gap-1 align-items-center justify-content-center">
            <i className="fa-regular fa-thumbs-up text-primary fs-5"></i>
            <i className="fa-solid fa-heart text-danger fs-5"></i>
            <span>22</span>
          </div>
          <div className="d-flex gap-2 align-items-center justify-content-center">
            <span>15</span>
            <i className="fa-solid fa-comment fs-5"></i>
            <span>25</span>
            <i className="fa-solid fa-share fs-5"></i>
          </div>
        </div>
        <hr className="mx-3" />

        <div className="row">
          <div className="card-footer-2 px-3 pb-3">
            <div className="d-flex justify-content-around align-items-center">
              <button className="btn btn-footer d-flex gap-2 align-items-center justify-content-center">
                <i className="fa-regular fa-thumbs-up fs-5"></i>
                <span>Like</span>
              </button>
              <button className="btn btn-footer d-flex gap-2 align-items-center justify-content-center">
                <i className="fa-solid fa-comment fs-5"></i>
                <span>Comment</span>
              </button>
              <button className="btn btn-footer d-flex gap-2 align-items-center justify-content-center">
                <i className="fa-solid fa-share fs-5"></i>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
