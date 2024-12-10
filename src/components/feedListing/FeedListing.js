import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  deletePost,
  updateDocId,
} from "../../store/slices/feedSlice";
import Card from "../card/Card";

export default function FeedListing() {
  const feed = useSelector((store) => store.feedSlice.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      dispatch(getPosts()); // Refetch posts after deleting
    });
  };

  const handleEdit = (id) => {
    dispatch(updateDocId(id));
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-6 ms-auto me-auto">
            <h3>Latest Posts</h3>

            <div className="post-card-group">
              {feed?.map((post, index) => (
                <Card
                  data={post}
                  key={post?.id || `${post?.createAt}-${index}`} // Using index as part of the key as a fallback
                  handleDelete={() => handleDelete(post?.id)}
                  handleEdit={() => handleEdit(post?.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
