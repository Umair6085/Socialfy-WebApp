import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const user = useSelector((store) => store.authSlice?.user); // Use authSlice instead of auth
  return user ? <Navigate to="/" /> : children;
}
