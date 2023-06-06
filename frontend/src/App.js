//react import
import React from "react";

//components import
import CreateAccount from "./components/CreateAccount";

//browser router function
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     loader: mainLoader,
//     errorElement: <Error />,
//     children: [
//       {
//         index: true, //same as -->    path: "/",
//         element: <Dashboard />,
//         loader: dashboardLoader,
//         action: dashboadAction,
//         errorElement: <Error />
//       },
//......
//...

const App = () => {
  return (
    <>
      <CreateAccount />
    </>
  );
};

export default App;
