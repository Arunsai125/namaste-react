import ShowItems from "./ShowItems";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <div className="cart m-4 p-4 text-center">
      <h1 className="cart-header text-2xl font-bold"> Cart </h1>
      <div>
        <ShowItems items={cartItems} />
      </div>
    </div>
  );
};
export default Cart;
