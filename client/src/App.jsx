import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { api } from "./utils.js";
import { createContext } from "react";

export const DataContext = createContext();
export const AllStateContext = createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  // cosn
  const [user, setUser] = useState();
  useEffect(() => {
    api
      .get("/login/me")
      .then((me) => {
        if (!me) {
          setUser(null);
        } else {
          setUser(me);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [user?.id]);
  return (
    <>{loading ? <h1>Loading</h1> : <Outlet context={[user, setUser]} />}</>
  );
}
