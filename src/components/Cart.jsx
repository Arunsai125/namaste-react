import ShowItems from "./ShowItems";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearCart());
  };
  return (
    <div className="cart m-4 p-4 text-center">
      <h1 className="cart-header text-2xl font-bold"> Cart </h1>
      <div className="item-list w-6/12 m-auto">
        <button
          className="cart-button bg-black text-white p-1 m-2 rounded-lg"
          onClick={handleClick}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1>The Cart is Empty, Please add items to your cart !</h1>
        )}
        <ShowItems items={cartItems} />
      </div>
    </div>
  );
};
export default Cart;
