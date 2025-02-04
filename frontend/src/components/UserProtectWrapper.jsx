import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectToken, setUser } from "../redux/slices/userSlice";

const UserProtectWrapper = ({ children }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          // dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error(error);
        dispatch(clearUser());
      }
    }

    fetchUser();
  }, [token]);

  return <div>{children}</div>;
};

export default UserProtectWrapper;
