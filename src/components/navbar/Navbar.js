import React from "react";
import { useDispatch } from 'react-redux';
import {logout} from "../../store/slices/authSlice"
export default function Navbar() {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-white">
        <div className="container">
          <a className="navbar-brand logo" href="#">
            SOCIALFY
          </a>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
}
