import React from 'react'
import FeedListing from '../../components/feedListing/FeedListing';
import CreatePost from '../../components/createPost/CreatePost';
import Navbar from '../../components/navbar/Navbar';

export default function Home() {
  return (
    <div>
        <Navbar />
         <CreatePost/> 
        <FeedListing/>
    </div>
  )
}
