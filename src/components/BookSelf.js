import React from "react";
import Book from "./Book";

export default function BookSelf({ currentShelf, books ,handleMove}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{currentShelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
            <Book book={book} handleMove={handleMove} currentShelf={currentShelf}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
