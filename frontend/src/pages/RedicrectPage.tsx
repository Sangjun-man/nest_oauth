import axios from "axios";
import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

function RedicrectPage() {
  const { search } = useLocation();
  const startStr = "?access_token=";
  const token = search.slice(search.indexOf(startStr) + startStr.length);
  console.log(token);
  axios.defaults.headers.Authorization = token ? `Bearer ${token}` : "";

  console.log(axios.defaults);
  return <Link to="/">메인으로</Link>;
}

export default RedicrectPage;
