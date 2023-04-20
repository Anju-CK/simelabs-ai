import React from "react";
import "./App.css";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
