import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";
import { v4 as uuidv4 } from 'uuid';

// updatePost
export const updatePost = createAsyncThunk("feed/updatePost", async (post) => {
  try {
    const docRef = doc(db, "posts", post.id);
    await updateDoc(docRef, post);
    return post;
  } catch (error) {
    console.log("error", error);
  }
});

// deletePost
export const deletePost = createAsyncThunk("feed/deletePost", async (id) => {
  try {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.log("error", error);
  }
});

// getPosts
export const getPosts = createAsyncThunk("feed/getPosts", async () => {
  try {
    const collectionRef = collection(db, "posts");
    const queryRef = query(
      collectionRef,
      where("title", "!=", "post1"),
      orderBy("title")
    );

    const docs = await getDocs(queryRef);
    let data = [];

    docs.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        ...doc.data(),
        createAt:
          docData.createAt instanceof Timestamp
            ? docData.createAt.toDate().getTime()
            : docData.createAt, // Keep as-is if not a Timestamp
      });
    });

    return data;
  } catch (error) {
    console.log("Error in getPosts:", error);
  }
});

// createPost
export const createPost = createAsyncThunk("feed/createPost", async (post) => {
  try {
    post.setLoading(true);
    const file = post.file;
    const fileRef = ref(storage, "socialAppMedia/" + uuidv4() + "-" + file.name);
    const metadata = { contentType: file.type };

    await uploadBytes(fileRef, file, metadata);
    const url = await getDownloadURL(fileRef);

    let newPost = {
      title: post.title,
      description: post.description,
      createAt: Date.now(),
      imageURL: url,
    };

    const collectionRef = collection(db, "posts");
    const response = await addDoc(collectionRef, newPost);

    post.setLoading(false);

    // Return the post with Firebase-generated ID to be used in feed
    return { id: response.id, ...newPost };
  } catch (error) {
    console.error("Create post error:", error);
  }
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
    updatePost: null,
    loading: false,
  },
  reducers: {
    addFeed: (state, action) => {
      console.log("action in addFeed", action.payload);
    },
    updateDocId: (state, action) => {
      console.log("action in updateDocId", action.payload);
      let post = state.feed.find((post) => post.id === action.payload);
      state.updatePost = post || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.feed.unshift(action.payload);
        }
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload || [];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.feed = state.feed.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.feed = state.feed.map((post) => (post.id === action.payload.id ? action.payload : post));
        state.updatePost = null;
      });
  },
});

export const { addFeed, updateDocId } = feedSlice.actions;
export default feedSlice.reducer;
