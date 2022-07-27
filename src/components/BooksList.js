import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);

  const [searchBook, setSearchBook] = useState("");

  // option 2, before fetch
  // useEffect(() => {
  //   getBooksList();
  // }, []);

  //function fetch to add then to useEffect, cleaner

  const onSubmitHandler = (event) => {
    event.preventdefault();

    const getBooksList = async () => {
      const response = await fetch(
        // `https://www.googleapis.com/books/v1/volumes?q=rowling&key=AIzaSyDDRDhXJtVOYtKlI-azc7_3321mnAaMDJo&maxResults=40`
        `https://www.googleapis.com/books/v1/volumes?q=rambo&key=${API_KEY}&maxResults=40`
        // "http://localhost:3000/books.json"
      );
      const data = await response.json();

      setBooksList(data.items);
      console.log("array", data.items);
    };
  };

  //option 1
  // useEffect(() => {
  //   getBooksList();
  // }, []);

  const onChangeHandler = (event) => {
    setSearchBook(event.target.value);
    console.log("target", event.target.value);
  };

  return (
    <div>
      <h1> My bookshelf</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="book"
          placeholder="Search your book"
          value={searchBook}
          onChange={onChangeHandler}
        />
        <button type="submit">Search</button>
      </form>

      {booksList.map((item, index) => {
        let bookCover =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;

        if (bookCover !== undefined) {
          return (
            <div key={index}>
              <p>{item.volumeInfo.title}</p>
              <p>{item.volumeInfo.authors} </p>

              <p> {item.volumeInfo.publishedDate}</p>
              <img src={bookCover} alt="cover_img" />
              <p>{item.volumeInfo.description}</p>
              <p>{item.volumeInfo.pageCount}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default BooksList;
