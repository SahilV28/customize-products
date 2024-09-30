import { json } from "react-router-dom";
import axios from "./Axios";
import React, { createContext, useEffect, useState } from "react";

export const productcontext = createContext();

const Context = ({ children }) => {
  const [products, setproducts] = useState(JSON.parse(localStorage.getItem("products")) || null);

  // const getProducts = async () => {
  //   try {
  //     const { data } = await axios("/products");
  //     setproducts(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <productcontext.Provider value={[products, setproducts]}>
      {children}
    </productcontext.Provider>
  );
};

export default Context;
