import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const formatPrice = (price) => `$${price.toLocaleString("es-AR")}`;

const Cart = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="mx-auto my-8 max-w-3xl px-4">
      <h1 className="mb-6 text-4xl font-bold">Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 py-4"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="my-6 text-right text-xl font-bold">
            Total: {formatPrice(total)}
          </p>
          <Link
            to="/checkout"
            className="inline-block bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
          >
            Continuar al checkout
          </Link>
        </>
      )}
    </main>
  );
};

export default Cart;
