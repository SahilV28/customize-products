import axios from "../utils/Axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { productcontext } from "../utils/Context";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(productcontext);

  const { id } = useParams();

  const [singleProduct, setsingleProduct] = useState(null);

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios(`/products/${id}`);
  //     setsingleProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const deleteProduct = (id)=>{
    const filterproduct = products.filter((p)=> p.id !== id);
    setproducts(filterproduct);
    localStorage.setItem("products",JSON.stringify(filterproduct));
    navigate("/")
  }

  useEffect(() => {
    if(!singleProduct){setsingleProduct(products.filter((p) => p.id == id)[0])}
  }, []);

  return singleProduct ? (
    <div className="w-[70%] flex h-full items-center justify-between m-auto p-[10%] ">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${singleProduct.image}`}
        alt=""
      />

      <div className="content  w-[50%]">
        <h1 className="text-3xl ">
          {singleProduct.title}
        </h1>
        <h3 className="text-zinc-400 my-2">{singleProduct.category}</h3>
        <h2 className="text-red-300 my-2">$ {singleProduct.price}</h2>
        <p className="mb-[5%]  text-[13px]">
         {singleProduct.description}
        </p>
        <Link to={`/edit/${singleProduct.id}`} className="px-4 py-1 rounded border border-blue-200 text-blue-300 mr-5">
          Edit
        </Link>
        <button onClick={()=>deleteProduct(singleProduct.id)} className="px-4 py-1 rounded border border-red-200 text-red-300 ml-5">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
