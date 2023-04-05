import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import PrivateRoute from "./privateRoute";
import Detail from "../pages/detail";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail"
          element={
            <PrivateRoute>
              <Detail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
