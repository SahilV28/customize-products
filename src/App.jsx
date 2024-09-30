import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
  const { pathname, search } = useLocation();

  return (
    <div className="w-screen h-screen flex ">
      {(pathname != "/" || search.length > 0) && (
        <Link
          className="text-red-200 absolute left-[17%] top-[3%] text-xs font-semibold"
          to="/"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/details/:id" element={<Details />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </div>
  );
};

export default App;
