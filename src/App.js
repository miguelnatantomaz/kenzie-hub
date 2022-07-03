import "./App.css";

import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />
      <Routes>
        <Route element={<Login />} exact path="/" />
        <Route element={<Register />} exact path="/register" />
        <Route element={<Dashboard />} exact path="/home" />
      </Routes>
    </>
  );
}

export default App;
