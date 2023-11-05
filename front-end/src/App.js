import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact/Contact";
import Checkout from "./pages/Buy/Checkout/Checkout";
import Shopdetail from "./pages/Buy/Shopdetail/Shopdetail";
import Login from "./offpage/Login/Login";
import Register from "./offpage/Register/Register";
import ChangePass from "./offpage/ChangePass/ChangePass";
import AdminPage from "../src/layout/Admin/Admin.jsx";

const App = () => {
  const publics = [
    {
      path: "/",
      pages: Home,
    },
    {
      path: "/shop",
      pages: Shop,
    },
    {
      path: "/shop/:id",
      pages: Shop,
    },
    {
      path: "/blog",
      pages: Blog,
    },
    {
      path: "/contact",
      pages: Contact,
    },

    {
      path: "/checkout",
      pages: Checkout,
    },
    {
      path: "/shopdetail",
      pages: Shopdetail,
    },
    {
      path: "/shopdetail/:id",
      pages: Shopdetail,
    },
    {
      path: "/admin",
      pages: AdminPage,
    },
    {
      path: "/user",
      pages: AdminPage,
    },
    {
      path: "/product",
      pages: AdminPage,
    },
    {
      path: "/brand",
      pages: AdminPage,
    },
    {
      path: "/user/:id",
      pages: AdminPage,
    },
    {
      path: "/product/:id",
      pages: AdminPage,
    },
  ];
  return (
    <div>
      <Routes>
        {publics.map((pub, index) => {
          const Pages = pub.pages;
          return (
            <Route
              key={index}
              path={pub.path}
              element={
                <>
                  <Layout>
                    <Pages />
                  </Layout>
                </>
              }
            />
          );
        })}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/change-password"
          element={<ChangePass></ChangePass>}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
