import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { productcontext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

const Home = () => {
  const [products] = useContext(productcontext);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  // const getCategoryProduct = async () => {
  //   try {
  //     const { data } = await axios(`/products/category/${category}`);
  //     setfilteredProducts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!filteredProducts || category == "undefined") {
      setfilteredProducts(products);
    }
    if (category != "undefined") {
      setfilteredProducts(products.filter((p)=>p.category == category));
      // getCategoryProduct();
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />

      <div className="w-[85%] p-10 flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((item, index) => (
            <Link
              key={index}
              to={`/details/${item.id}`}
              className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[35vh] flex flex-col justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              ></div>
              <h3 className="text-xs hover:text-blue-300">{item.title}</h3>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
