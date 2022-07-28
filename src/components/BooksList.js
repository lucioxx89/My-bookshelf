import React, { useState } from "react";

const KEY = "AIzaSyB_1 - _2uklrOMSr49BIDIvBvhcPDkhyHJE";

// const API_KEY = process.env.REACT_APP_API_KEY;

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [searchBook, setSearchBook] = useState("");

  //OPTION MORE CLEAN BUT PROBLEM WITH USEeFFECT --KEEP IT--
  //function fetch to add then to useEffect, cleaner

  // const onSubmitHandler = (event) => {
  //   //preventDefault wasnt working, solution found on the web
  //   if (event && event.preventDefault) {
  //     event.preventDefault();
  //   }
  // };

  // const getBooksList = async () => {
  //   const response = await fetch(
  //     //   `https://www.googleapis.com/books/v1/volumes?q=london&key=${API_KEY}&maxResults=40`
  //     // );

  //     `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyB_1 - _2uklrOMSr49BIDIvBvhcPDkhyHJE`
  //   );
  //   // "http://localhost:3000/books.json"
  //   const data = await response.json();

  //   // setSearchBook();
  //   setBooksList(data.items);

  //   console.log("array", data.items);
  // };

  // // option 1
  // useEffect(() => {
  //   // onSubmitHandler();
  //   getBooksList();
  // }, []);

  // const onChangeHandler = (event) => {
  //   // setSearchBook(event.target.value);
  //   console.log("target", event.target.value);
  // };

  //  TO MODIFY
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoading("Loading");
    getBooksList();
  };

  const getBooksList = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=${KEY}&maxResults=40`
    );

    if (!response.ok || response.ok === 0) {
      setBooksList([]);
      setLoading("");
      const message = `An error has occured: ${response.status}`;
      setError(message);
      throw new Error(message);
    }
    setBooksList([]);
    const data = await response.json();

    setSearchBook("");
    setLoading("");
    setError("");
    setBooksList(data.items);

    console.log("array", data.items);
  };

  const onChangeHandler = (event) => {
    setSearchBook(event.target.value);
    console.log("target", event.target.value);
  };

  // OPTION WITH FETCH LIKE IN WEATHER APP  --WORKS--
  // const onSubmitHandler = (event) => {
  //   setLoading("Loading...");
  //   event.preventDefault();

  //   fetch(
  //     `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=AIzaSyB_1 - _2uklrOMSr49BIDIvBvhcPDkhyHJE&maxResults=40`
  //   )
  //     .then((response) => {
  //       if (!response.ok || response.ok === 0)
  //         throw Error("There was a problem with your request.Try again!");
  //       return response.json();
  //     })

  //     .then((data) => {
  //       console.log(data.items, "List from city API");

  //       setError("");
  //       setLoading("");
  //       setBooksList(data.items);
  //     })

  //     .catch((error) => {
  //       setLoading("");
  //       setError(error.message);
  //       setBooksList([]);
  //       console.log(error.message);
  //     });

  //   setSearchBook("");
  // };

  // const onChangeHandler = (event) => {
  //   setSearchBook(event.target.value);
  // };

  return (
    <div>
      <h1>My bookshelf</h1>
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
      <p>{loading}</p>
      <p>{error} </p>
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
