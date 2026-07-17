import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { fetchAllPublicBookAction } from "@features/book/bookAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPublicBookAction());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
