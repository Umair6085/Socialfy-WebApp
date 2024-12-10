import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); // Add loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!phone) errors.phone = "Phone number is required";
    if (!address.trim()) errors.address = "Address is required";
    if (!gender) errors.gender = "Gender is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true); // Set loading to true when signup starts

    let user = {
      name,
      email,
      password,
      phone,
      address,
      gender,
    };

    try {
      await dispatch(signup(user)).unwrap(); // Use unwrap to catch any errors
      navigate('/'); // Navigate to main page after successful signup
    } catch (error) {
      console.error("Signup failed: ", error);
      // Handle signup error (e.g., set error message)
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleLogin = () => {
    navigate('/login');
  }
  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="p-4">
            <h2 className="text-center mb-4">Create Account</h2>
            <div className="card py-3">
              <div className="card-body d-flex flex-column gap-2">
                <input
                  type="text"
                  className={`form-control m-1 ${error.name ? "is-invalid" : ""}`}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="invalid-feedback">{error.name}</div>

                <input
                  type="email"
                  className={`form-control m-1 ${error.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback">{error.email}</div>

                <input
                  type="password"
                  className={`form-control m-1 ${error.password ? "is-invalid" : ""}`}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">{error.password}</div>

                <input
                  type="tel"
                  className={`form-control m-1 ${error.phone ? "is-invalid" : ""}`}
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="invalid-feedback">{error.phone}</div>

                <input
                  type="text"
                  className={`form-control m-1 ${error.address ? "is-invalid" : ""}`}
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="invalid-feedback">{error.address}</div>

                <p className="ms-2">Gender:</p>
                <div className="genders d-flex gap-3 row ms-1">
                  <div className="male d-flex gap-2 col-sm-12 col-md-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={() => setGender("male")}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>

                  <div className="female d-flex gap-2 col-sm-12 col-md-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={() => setGender("female")}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>

                  <div className="other d-flex gap-2 col-sm-12 col-md-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="other"
                      value="other"
                      onChange={() => setGender("other")}
                    />
                    <label className="form-check-label" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>
                <div className="invalid-feedback d-block ms-1">{error.gender}</div>

                {loading ? (
                  <Spinner /> // Show spinner while loading
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary mt-4"
                  >
                    Submit
                  </button>
                )}
                
                <p className='text-center'>
                  Already have an account? 
                  <a onClick={handleLogin} className="mt-4 text-primary mx-1 register">Login</a>
                  instead!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
