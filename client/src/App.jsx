import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AppRouter from "./routes/AppRouter";

import { useGetMeQuery } from "./api/authApi";
import { useAppDispatch } from "./app/hooks";
import { setUser, clearUser } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useAppDispatch();

  // Fire once on mount – even if there is no cookie
  const { data, error, isFetching } = useGetMeQuery();

  // Push the result into Redux when it arrives
  React.useEffect(() => {
    if (data?.user) dispatch(setUser(data.user));
    if (error) dispatch(clearUser());
  }, [data, error, dispatch]);

  // Hold off rendering routes until the cookie check is done
  if (isFetching) return null;

 return (
     <>
       <Navbar />
       <AppRouter />
     </>
  );
}