import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./CSS/app.css";
import "./CSS/seller.css";
import "./CSS/buyer.css";

import LoginPage from "./AllContent/LoginPage";
import Seller from "./AllContent/Seller";
import Buyer from "./AllContent/BuyerFlow";
//import Main from "./AllContent/Main";

const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/sellerFlow",
      element: <Seller />,
    },
    {
      path: "/buyerFlow",
      element: <Buyer />,
    },
    // {
    //   path: "/main",
    //   element: <Main />,
    // },
  ],
  {
    basename: "/rentifie",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
