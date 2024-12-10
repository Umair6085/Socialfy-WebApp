import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner/Spinner';
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Set loading to true when login starts
    let user = { email, password };

    try {
      await dispatch(login(user)).unwrap(); // Use unwrap to catch errors
      // Navigate after successful login
      navigate('/'); // Redirect to the main page or dashboard
    } catch (error) {
      console.error("Login failed: ", error);
      // Handle login error (e.g., show error message)
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <form className="formData p-4">
            <div className="card py-3">
              <h2 className="text-center mb-4">Login</h2>
              <div className="card-body d-flex flex-column gap-2 px-5">
                <label className="fw-medium">Email</label>
                <input
                  type="email"
                  className={`form-control m-1 ${errors.email ? "is-invalid" : ""}`}
                  placeholder="user@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                <label className="fw-medium">Password</label>
                <input
                  type="password"
                  className={`form-control m-1 ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                {loading ? (
                  <Spinner /> // Show spinner while loading
                ) : (
                  <button type="submit" onClick={handleLogin} className="btn btn-primary mt-4">Login</button>
                )}
                
                <p className='text-center'>
                  Don't have an account? 
                  <a onClick={handleRegister} className="mt-4 text-primary mx-1 register">Register</a>
                  instead!
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
