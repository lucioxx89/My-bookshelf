import React, { useState } from "react";

const KEY = "AIzaSyB_1 - _2uklrOMSr49BIDIvBvhcPDkhyHJE";

// const API_KEY = process.env.REACT_APP_API_KEY;

const BooksList = () => {
  const [booksList, setBooksList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [searchBook, setSearchBook] = useState("");

  //  OPTION 1
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError("");
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

    setError("");
    setBooksList([]);
    const data = await response.json();

    setSearchBook("");
    setLoading("");
    setError("");
    setBooksList(data.items);

    console.log("array", data.items);
  };

  // without using effect

  // useEffect(() => {
  //   getBooksList(searchBook);
  // }, [searchBook]);

  const onChangeHandler = (event) => {
    setSearchBook(event.target.value);
    console.log("target", event.target.value);
  };

  // OPTION 2: FETCH AND .THEN, LIKE IN WEATHER APP  --WORKS-- more promise chain

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

              <p>{item.volumeInfo.publishedDate}</p>
              <img src={bookCover} alt="cover_img" />
              <p>{item.volumeInfo.description}</p>
              <p>Pages: {item.volumeInfo.pageCount}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default BooksList;
