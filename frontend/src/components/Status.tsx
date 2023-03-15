import React, { useEffect, useState } from "react";
import { getUserData } from "../api/user";

function Status() {
  const [user, setUser] = useState();
  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getUserData();
        console.log(user);
        // setUser(user);
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
