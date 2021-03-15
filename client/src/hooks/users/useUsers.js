import axios from "axios";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setusers] = useState({
    users: [],
    loading: true,
  });
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth").then((resp) => {
      setusers({
        users: resp,
        loading: false,
      });
    });
  }, []);
  return users;
};
