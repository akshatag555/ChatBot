import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [cred, setcred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = cred;

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    localStorage.setItem("token", json.authtoken);
    

    if (json.success) {
       history("/login");
      //console.log(json);
    } else alert("invalid");
  };
  const onChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label for="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            onChange={onChange}
            id="cpassword"
          />
        </div>
        <div className="mb-3 form-check"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
