import React from "react";

function Login() {
  return (
    <a href={`${process.env.REACT_APP_API_URL}/auth/google/login`}> Login </a>
  );
}

export default Login;
