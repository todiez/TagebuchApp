//react import
import React from "react";

//rrd import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components import
import CreateAccount from "./components/CreateAccount";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";

//browser router function
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createaccount",
    element: <CreateAccount />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="container">
      <Navbar></Navbar>
      <RouterProvider router={router} style={{margin: 350}}/>
      <h2>test</h2>
    </div>
  );
};

export default App;
