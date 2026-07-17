import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { fetchAllPublicBookAction } from "@features/book/bookAction";
import { ModalWrapper } from "@components/modalWrapper/ModalWrapper";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPublicBookAction());
  }, [dispatch]);
  return (
    <>
      <AppRoutes />
      <ModalWrapper />

      <ModalWrapper />
    </>
  );
}

export default App;
