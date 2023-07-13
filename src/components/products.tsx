import { useEffect, useState } from "react";
import Product from "./product";
import {AnimatePresence, motion } from "framer-motion";
import { IProduct } from "../utils/types";

export default function Products({ URL }) {
  
  const [products, setProducts]: [Array<IProduct>, Function] = useState([]);

  const [elementSelected, setElementSelected]: [IProduct | undefined , Function] = useState();


  function handleClickImage(element:IProduct) {
    if(elementSelected === undefined){
      setElementSelected(element)
      return
    } 
    setElementSelected();
    setTimeout(()=> setElementSelected(element),500)
  }

  useEffect(() => {
    const getProducts = async () => {
      const req = await fetch(URL);
      const res = await req.json();
      setProducts(res);
    };
    document.addEventListener('keydown',(e) => {
      if(e.keyCode === 27 && elementSelected !== undefined) {
        setElementSelected();
      }
    })
    getProducts();
  }, []);

  return (
    <>
      <article className="grid place-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 w-full h-full py-5 px-3 bg-slate-300">
        {products.length === 0 && <h1>No results</h1>}
        {products.length != 0 &&
          products.map((element, index) => {
            const price = element.price.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            });
            return (
              <Product
                key={index}
                element={element}
                price={price}
                handleClickImage={handleClickImage}
                elementSelected={elementSelected}
              />
            );
          })}
      </article>
      <AnimatePresence>
        {elementSelected != undefined && (
          <motion.article layoutId={elementSelected._id} 
          transition={{duration : .5}}
          className="fixed top-[10vh]  bg-slate-100 h-3/4 w-3/4 p-14 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-lg min-w-[400px] max-w-[900px] z-20">
            <motion.input
              type="button"
              value="X"
              className="absolute right-6 top-4 cursor-pointer"
              onClick={()=> setElementSelected()}
            />

            <motion.section className="overflow-y-scroll h-full grid place-items-center">
              <motion.img
                onClick={() => (location.href = `/products/${elementSelected._id}`)}
                src={elementSelected.image}
                className='rounded-md cursor-pointer'
                alt={elementSelected._id}
              />
              <motion.p className="">{elementSelected.name}</motion.p>
              <motion.p className="">
                {elementSelected.description}
              </motion.p>
            </motion.section>
          </motion.article>
        )}
      </AnimatePresence>
    </>
  );
}
