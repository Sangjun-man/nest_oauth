import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user";

function Status() {
  const [user, setUser] = useState();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getUserData();
        console.log(data);
        setUser(data.userId);
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
    return;
  });

  if (!user) return <div></div>;

  return <div>{user}</div>;
}

export default Status;
