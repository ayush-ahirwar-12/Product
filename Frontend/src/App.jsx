import React, { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import { axiosInstance } from "./config/AxiosInstace";
import { addUser } from "./features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        let me = await axiosInstance.get("/auth/me");
        console.log(me.data.user);
        if (me) {
          dispatch(addUser(me?.data?.user));
        }
      } catch (error) {
        console.log("error in /me router", error);
      }
    })();
  }, []);
  return (
    <div>
      <AppRouter />
    </div>
  );
};

export default App;
