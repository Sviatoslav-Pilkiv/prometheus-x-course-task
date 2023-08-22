import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./cart.css";

export default function Cart() {
  const [ordersPrice, setOrdersPrice] = useState(0);
  const { orders, setOrders } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const newTotalPrice = orders.reduce(
      (total, item) => total + parseFloat(item.totalPrice),
      0
    );
    setOrdersPrice(newTotalPrice);
  }, [ordersPrice, orders]);

  const handleReturn = () => {
    navigate("/books");
  };

  const handlePurchase = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  const handleDelete = (title) => {
    const indexToRemove = orders.findIndex((item) => item.title === title);
    const updatedOrders = [...orders];
    updatedOrders.splice(indexToRemove, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <main className="cart-content">
      <button
        type="button"
        className="purchase"
        disabled={orders.length === 0}
        onClick={handlePurchase}
      >
        Purchase
      </button>
      <div className="cart-items">
        {orders.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Count</th>
                  <th>Price for one</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.count}</td>
                    <td>{item.price}$</td>
                    <td>{Number(item.totalPrice).toFixed(2)}$</td>
                    <td>
                      <FaTrashAlt
                        className="delete"
                        onClick={() => handleDelete(item.title)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td colSpan="2">{ordersPrice.toFixed(2)}$</td>
                </tr>
              </tfoot>
            </table>
            <button type="button" className="return" onClick={handleReturn}>
              Return
            </button>
          </>
        ) : (
          <div className="cart-empty">
            <FaShoppingCart className="cart-icon" />
            <h2>Cart empty...</h2>
            <button type="button" className="return" onClick={handleReturn}>
              Back to the book list
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
