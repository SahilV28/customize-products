import React, { useContext, useState } from "react";
import { productcontext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(productcontext);

  const [image, setimage] = useState("");
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const AddProductHandler = (event) => {
    event.preventDefault();

    if (
      image.trim().length < 4 ||
      title.trim().length < 4 ||
      category.trim().length < 4 ||
      price.trim().length < 1 ||
      description.trim().length < 4
    ) {
      alert("Every input has atleast 4 character");
      return;
    }

    const newProduct = {
      id: nanoid(),
      image,
      title,
      category,
      price,
      description,
    };
    setproducts([...products, newProduct]);
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    navigate("/");
  };

  return (
    <>
      <form
        onSubmit={AddProductHandler}
        className="w-screen h-screen flex flex-col p-[5%] items-center"
      >
        <h1 className="text-3xl font-semibold mb-5 w-1/2">Add New Product</h1>
        <input
          type="url"
          placeholder="Please Enter Image Link"
          className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Please Enter Title"
          className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

        <div className="w-1/2 flex gap-8 justify-between">
          <input
            type="text"
            placeholder="Category"
            className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>

        <textarea
          className="bg-zinc-100 text-xl rounded p-3 w-1/2 mb-3"
          placeholder="Please Write Description"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
        ></textarea>

        <div className="w-1/2">
          <button className="px-4 py-2 rounded border border-sky-200 text-blue-200  hover:bg-blue-400">
            Add New Product
          </button>
        </div>
      </form>
    </>
  );
};

export default Create;
