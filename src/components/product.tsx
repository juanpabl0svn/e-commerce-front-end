import { useContextApp } from "../context/shopping-car-context";
import { motion } from "framer-motion";
import { IShoppingCar, IProduct } from "../utils/types";

export function getTotal(newCar: IShoppingCar) {
  let newTotal = 0;

  Object.entries(newCar.elements).forEach((elementSelected) => {
    const [, value] = elementSelected as [string, IProduct];
    newTotal += value.price * value.units;
  });
  return newTotal;
}

export default function Product({
  element,
  price,
}: {
  element: IProduct;
  price: string;
}) {
  const { handleCartElements, elementSelected, handleClickImage, shoppingCar } =
    useContextApp();

    const elementSelectedType = (elementSelected as unknown) as IProduct

  return (
    <motion.article
      className={`h-auto w-auto object-cover hover:scale-105 transition-all duration-300 shadow-[rgba(0,_0,_0,_0.07)_0px_1px_1px,_rgba(0,_0,_0,_0.07)_0px_2px_2px,_rgba(0,_0,_0,_0.07)_0px_4px_4px,_rgba(0,_0,_0,_0.07)_0px_8px_8px,_rgba(0,_0,_0,_0.07)_0px_16px_16px] min-h-[200px] ${
        elementSelected != undefined &&
        elementSelectedType.name == element.name &&
        "opacity-0"
      }`}
    >
      <motion.img
        layoutId={element._id}
        src={element.image}
        alt={element.name}
        className={`rounded-t-xl h-48 aspect-auto ${
          (elementSelectedType?.name != element?.name ||
            elementSelected == undefined) &&
          "cursor-pointer"
        }`}
        onClick={() =>
          (elementSelectedType?.name != element?.name ||
            elementSelected == undefined) &&
          handleClickImage(element)
        }
      />
      <motion.section className="h-20 bg-slate-50 border-t-2 p-1 relative">
        <motion.p>{element.name}</motion.p>
        <motion.p>{price}</motion.p>
        <motion.p>{element.units === 0 ? "Agotado" : element.units}</motion.p>
        {element.units !== 0 && (<motion.div
          className={`absolute right-2 bottom-2 flex items-center p-2 rounded-3xl cursor-pointer bg-green-300 ${shoppingCar.elements[element._id] && 'bg-red-500'}`}
          onClick={() => {
            handleCartElements(element);
          }}
        >
          <motion.img
            className="h-6"
            src="/icons/add-to-cart.png"
            alt="add cart"
          />
          <motion.p>
            {!shoppingCar.elements[element._id] ? "Add" : "Quit"}
          </motion.p>
        </motion.div>)}
        
        {/* <motion.img
          src="/icons/minus-icon.png"
          alt="plus"
          className="h-5 absolute right-8 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer active:scale-90"
          onClick={() => handleClickMinus(element)}
        />
        <motion.img
          src="/icons/add-icon.png"
          alt="plus"
          className="h-5 absolute right-2 bottom-2 bg-slate-500 p-1 rounded-[50%] cursor-pointer active:scale-90"
          onClick={() => handleClickAdd(element)}
        /> */}
      </motion.section>
    </motion.article>
  );
}
