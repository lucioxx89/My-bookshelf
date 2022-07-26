import React, { useState, useEffect } from "react";

import axios from "axios";

const BooksList = () => {
  const [title, setTitle] = useState("");

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://www.googleapis.com/books/v1/volumes?q=inauthor:keyes&key=AIzaSyB_1-_2uklrOMSr49BIDIvBvhcPDkhyHJE"
  //       )
  //       .then((response) => {
  //         console.log("result", response);
  //         setTitle(response.items);
  //         console.log(response.items, "ok");
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   }, []);
  fetch(
    // `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
    // "http://localhost:3000/daily.json"

    `https://www.googleapis.com/books/v1/volumes?q=inauthor:keyes&key=AIzaSyB_1-_2uklrOMSr49BIDIvBvhcPDkhyHJE`
  )
    .then((response) => {
      if (!response.ok || response.ok === 0)
        throw Error("There was a problem with your request.Try again!");
      return response.json();
    })

    .then((data) => {
      console.log(data, "json");
      console.log(data.items, "ok");
      setTitle(data.items[0]);
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <div>
      {title.map((item, index) => {
        console.log(item, "item");
        return (
          <div key={index}>
            <h1> My bookshelf</h1>
            <p>{item.volumeInfo.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BooksList;
