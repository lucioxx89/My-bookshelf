import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

const API_URL = `https://www.googleapis.com/books/v1/volumes?q=jhon&key=${API_KEY}&maxResults=40`;

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);

  // const [searchBook, setSearchBook] = useState("");

  //function fetch to add then to useEffect, cleaner
  const getBooksList = async () => {
    const response = await fetch(
      // `https://www.googleapis.com/books/v1/volumes?q=rowling&key=AIzaSyDDRDhXJtVOYtKlI-azc7_3321mnAaMDJo&maxResults=40`
      API_URL
      // "http://localhost:3000/books.json"
    );
    const data = await response.json();

    setBooksList(data.items);
    console.log("array", data.items);
  };

  useEffect(() => {
    getBooksList();
  }, []);

  // const onSubmitHandler = (event) => {
  //   event.preventdefault();
  //   getBooksList();
  // };

  // const onChangeHandler = (event) => {
  //   setSearchBook(event.target.value);
  //   console.log("target", event.target.value);
  // };

  return (
    <div>
      <h1> My bookshelf</h1>

      {/* <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="book"
          placeholder="Search your book"
          // value={searchBook}
          onChange={onChangeHandler}
        />
        <button type="submit">Search</button>
      </form> */}

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
