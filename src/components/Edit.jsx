import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productcontext } from "../utils/Context";

const Edit = () => {
  const [products, setproducts] = useContext(productcontext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [editedProduct, seteditedProduct] = useState({
    image:"",
    title:"",
    category:"",
    price:"",
    description:"",
  });

  const changeHandler = (e)=>{
    seteditedProduct({...editedProduct, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    seteditedProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (event) => {
    event.preventDefault();

    if (
      editedProduct.image.trim().length < 4 ||
      editedProduct.title.trim().length < 4 ||
      editedProduct.category.trim().length < 4 ||
      editedProduct.price.trim().length < 1 ||
      editedProduct.description.trim().length < 4
    ) {
      alert("Every input has atleast 4 character");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);

    const copyData = [...products];
    copyData[pi] = {...products, ...editedProduct}
    setproducts(copyData)
    localStorage.setItem("products", JSON.stringify(copyData));
    navigate(-1);
  };;

  return (
    <>
      <form
        onSubmit={AddProductHandler}
        className="w-screen h-screen flex flex-col p-[5%] items-center"
      >
        <h1 className="text-3xl font-semibold mb-5 w-1/2">Edit Product</h1>
        <input
          type="url"
          name="image"
          placeholder="Please Enter Image Link"
          className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
          value={editedProduct && editedProduct.image}
          onChange={changeHandler}
        />

        <input
          type="text"
          name="title"
          placeholder="Please Enter Title"
          className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
          value={editedProduct && editedProduct.title}
          onChange={changeHandler}
        />

        <div className="w-1/2 flex gap-8 justify-between">
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
            value={editedProduct && editedProduct.category}
            onChange={changeHandler}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
            value={editedProduct && editedProduct.price}
            onChange={changeHandler}
          />
        </div>

        <textarea
          className="bg-zinc-100 text-s rounded p-3 w-1/2 mb-3"
          name="description"
          placeholder="Please Write Description"
          onChange={changeHandler}
          value={editedProduct && editedProduct.description}
        ></textarea>

        <div className="w-1/2">
          <button className="px-4 py-2 rounded border border-sky-200 text-blue-200  hover:bg-blue-400">
            Update Product
          </button>
        </div>
      </form>
    </>
  );
};

export default Edit;
