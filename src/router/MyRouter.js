import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { CartContext } from "../context/CartContext";
import SignIn from "../pages/sign-in/SignIn";
import BookList from "../pages/book-list/BookList";
import Book from "../pages/specific-book/Book";
import Cart from "../pages/cart/Cart";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import App from "../App";

export default function MyRouter(props) {
  const [user, setUser] = useState(false);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("./books.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => console.error("Error fetching data:", error));
    const localeOrders = localStorage.getItem("orders");
    if (localeOrders) {
      setOrders(JSON.parse(localeOrders));
    }
  }, []);

    useEffect(() => {
      const savedUser = localStorage.getItem("userName");
      if (savedUser) {
        setUser(true);
      }
    }, []);

  const addToCart = (id, title, count, price, totalPrice) => {
    const excitingOrders = orders.find((item) => item.id === id);

    if (excitingOrders) {
      const updatedOrders = orders.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + count,
            totalPrice: (item.count + count) * item.price,
          };
        }
        return item;
      });
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } else {
      const newItem = {
        id: id,
        title: title,
        count: count,
        price: price,
        totalPrice: totalPrice,
      };
      const updatedOrders = [...orders, newItem];
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }
  };

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      <CartContext.Provider value={{ orders, setOrders }}>
        <Routes>
          <Route path="/" element={<App user={user} setUser={setUser} />}>
            <Route index element={<SignIn setUser={setUser} />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route
              path="/books"
              element={user ? <BookList /> : <Navigate to="/signin" />}
            />
            <Route
              path="/book/:id"
              element={
                user ? (
                  <Book addToCart={addToCart} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/signin" />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartContext.Provider>
    </BookContext.Provider>
  );
}
