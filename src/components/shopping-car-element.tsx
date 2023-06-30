import {CarShop } from "../context/car-shop";
import { getTotal } from "./product";


export default function ShoppingCarElement({ element, image, units, price,carShop, setCarShop }:{ element:string, image:string, units:number, price: number,carShop :CarShop, setCarShop:Function }) {
  
    function handleClickDelete(key: string) {
    const newCarShop: CarShop = { ...carShop };
    delete newCarShop.elements[key];
    setCarShop({ ...newCarShop, total: getTotal(newCarShop) });
  }

  return (
    <article
      className="relative flex items-center bg-white gap-2 h-36 shadow-[0_8px_30px_rgb(0,0,0,0.12)] pl-1"
    >
      <img src={image} alt={element} className="h-5/6 w-36 aspect-video" />
      <div className="[&>p]:font-Georgia">
        <p className="font-bold">{element}</p>
        <p><b>Units:</b> {units}</p>
        <p><b>Total:</b>{(units * price).toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}</p>
      </div>
      <input
        type="button"
        value="X"
        className="absolute right-4 cursor-pointer"
        onClick={() => handleClickDelete(element)}
      />
    </article>
  );
}