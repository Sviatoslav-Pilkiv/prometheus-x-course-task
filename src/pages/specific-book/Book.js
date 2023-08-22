import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { CartContext } from "../../context/CartContext";
import "./book.css";

export default function Book(props) {
  const [book, setBook] = useState([]);
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { orders } = useContext(CartContext);
  const { books } = useContext(BookContext);
  const { id } = useParams();

  useEffect(() => {
    if (count < 1) {
      setCount(1);
    }
    if (count > 42) {
      setCount(42);
    }

    if (books) {
      const selectedBook = books.find((book) => book.id === parseInt(id));
      setBook(selectedBook);

      if (selectedBook) {
        const AllPrice = (
          count * Number.parseFloat(selectedBook.price)
        ).toFixed(2);
        setTotalPrice(AllPrice);
      }
    }
  }, [books, id, count]);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    if (count < 42) {
      setCount(parseInt(count) + 1);
    }
  };

  const handleChangeCount = (event) => {
    const newCount = event.target.value;
    if (newCount >= 1 && newCount <= 42) {
      setCount(newCount);
    }
  };

  const handleAddedToCart = () => {
    props.addToCart(id, book.title, count, book.price, totalPrice);
  };

  return (
    <main className="book-page">
      <div className="container">
        <section className="book-preview">
          <img
            src={book.image || book.notImage}
            alt=""
            className="book-photo"
          />
        </section>
        <section className="book-information">
          <h4>
            <span>Name:</span>
            {book.title}
          </h4>
          <h4>
            <span>Author:</span>
            {book.author}
          </h4>
          <h4>
            <span>Level:</span>
            {book.level}
          </h4>
          <h4>
            <span>Tags:</span>
            {book.tags &&
              book.tags.map((item, index) => <li key={index}>{item}</li>)}
          </h4>
        </section>
        <section className="book-purchase">
          <div className="book-price">
            <p>Price,$</p>
            <p className="price">{book.price}</p>
          </div>
          <div className="quantity">
            <label htmlFor="book-quantity">Count</label>
            <div className="change-count">
              <button className="btn" id="decrement" onClick={decreaseCount}>
                -
              </button>
              <input
                type="number"
                id="book-quantity"
                data-testid="count-display"
                value={count}
                onChange={handleChangeCount}
              />
              <button className="btn" id="increment" onClick={increaseCount}>
                +
              </button>
            </div>
          </div>
          <div className="total-price-info">
            <p>Total Price,$</p>
            <p className="total-price" data-testid="total-price">
              {totalPrice}
            </p>
          </div>
          <div className="count-add">
            Added to cart: {orders.find((item) => item.id === id)?.count || 0}
          </div>
          <button className="add-to-cart" onClick={handleAddedToCart}>
            Add to cart
          </button>
        </section>
      </div>
      <div className="description">
        <p>Description:</p>
        <span className="book-description">{book.description}</span>
      </div>
    </main>
  );
}
