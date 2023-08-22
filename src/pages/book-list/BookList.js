import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import Sort from "../../components/Sort";
import "./list.css";

export default function BookList() {
  const { books } = useContext(BookContext);
  const [originalBooks, setOriginalBooks] = useState(books);
  const [text, setText] = useState("");
  const [filterPrice] = useState([
    { key: "all", name: "All" },
    { key: "price 0-15", name: "0$-15$", min: 0, max: 15 },
    { key: "price 15-30", name: "15$-30$", min: 15, max: 30 },
    { key: "price 30+", name: "30+$", min: 30 },
  ]);
  const [changePrice, setChangePrice] = useState("all");
  const defaultImage = "/image/notImage.jpg";

  const handleBookName = (event) => {
    const searchText = event.target.value;
    setText(searchText);
  };

  const handleSortPrice = (event) => {
    const sortPrice = event.target.value;
    setChangePrice(sortPrice);
  };

  useEffect(() => {
    let filteredBooks = books;

    if (text) {
      filteredBooks = filteredBooks.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (changePrice !== "all") {
      const selectedFilter = filterPrice.find(
        (item) => item.key === changePrice
      );
      if (selectedFilter) {
        filteredBooks = filteredBooks.filter(
          (book) =>
            selectedFilter.min <= book.price &&
            (!selectedFilter.max || book.price <= selectedFilter.max)
        );
      }
    }

    setOriginalBooks(filteredBooks);
  }, [books, text, filterPrice, changePrice]);

  return (
    <main className="books-page">
      <Sort
        text={text}
        price={filterPrice}
        changePrice={changePrice}
        handleTextChange={handleBookName}
        handlePriceChange={handleSortPrice}
      />
      <section className="book-list">
        {originalBooks.length > 0 ? (
          originalBooks.map((book) => (
            <div key={book.id} className="book">
              <img
                src={book.image || defaultImage}
                alt={book.title}
                className="book-image"
              />
              <p>
                <span>Book name:</span>
                {book.title.length > 24
                  ? book.title.slice(0, 24) + "..."
                  : book.title}
              </p>
              <p>
                <span>Book autor:</span> {book.author}
              </p>
              <p>
                <span>Price: </span>
                {book.price}$
              </p>
              <Link to={`/book/${book.id}`}>
                <button className="view">View</button>
              </Link>
            </div>
          ))
        ) : (
          <div>Book Not Found</div>
        )}
      </section>
    </main>
  );
}
