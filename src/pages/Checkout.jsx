import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

const formatPrice = (price) => `$${price.toLocaleString("es-AR")}`;

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [pedido, setPedido] = useState(null);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const confirmarCompra = () => {
    setPedido({
      items: cartItems.map((item) => ({ ...item })),
      total,
    });
    clearCart();
  };

  if (pedido) {
    return (
      <main className="mx-auto my-8 max-w-3xl px-4">
        <h1 className="mb-4 text-3xl font-bold text-accents">
          ¡Gracias por tu compra, {user.name}!
        </h1>
        <h2 className="mb-2 text-xl font-bold">Resumen de tu compra</h2>
        <ul className="divide-y divide-gray-300">
          {pedido.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-4 py-3"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="my-6 text-xl font-bold">
          Total: {formatPrice(pedido.total)}
        </p>
        <Link
          to="/productos"
          className="inline-block bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
        >
          Seguir comprando
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto my-8 max-w-3xl px-4">
      <h1 className="mb-6 text-4xl font-bold">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío. Agregá productos antes de confirmar la compra.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 py-3"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="my-6 text-xl font-bold">Total: {formatPrice(total)}</p>
          <button
            type="button"
            onClick={confirmarCompra}
            className="bg-accents px-4 py-2 font-bold text-white hover:bg-accents-hover"
          >
            Confirmar compra
          </button>
        </>
      )}
    </main>
  );
};

export default Checkout;
