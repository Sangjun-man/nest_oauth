import axios from "axios";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function RedicrectPage() {
  const { pathname } = useLocation();
  const startStr = "/redirect/";
  const token = pathname.slice(pathname.indexOf(startStr) + startStr.length);

  axios.defaults.headers.Authorization = `Bearer ${token}`;

  return <Link to="/">메인으로</Link>;
}

export default RedicrectPage;
