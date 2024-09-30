import React, { useContext } from "react";
import { productcontext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products, setproducts] = useContext(productcontext);

  //How to find distinct category
  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  // console.log(distinct_category)

  // to get random color
  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.5)`
  }

  return (
    <nav className="w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5">
      <a
        className="px-4 py-2 rounded border border-sky-200 text-blue-200 "
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%] my-2 " />
      <h3 className="text-s w-[80%] mb-3 font-semibold">Category Filter</h3>

      <div className=" w-[80%]">
        {distinct_category.map((category, index) => {
          return (
            <Link
              key={index}
              to={`/?category=${category}`}
              className="flex items-center mb-3 text-sm hover:scale-110 hover:text-red-400 "
            >
              <span style={{backgroundColor: color()}} className="rounded-full mr-2 w-[15px] h-[15px] bg-blue-100 "></span>{" "}
              {category}
            </Link>
          );
        })}
      </div>

    </nav>
  );
};

export default Nav;
