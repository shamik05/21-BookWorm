import React, { useState } from "react";
import API from "../utils/API";
import Result from "../components/Result";

function Search() {
  const [books, setBooks] = useState();
  const [searchValue, setSearchValue] = useState();

  function handleInputChange(event) {
    const { value } = event.target;
    setSearchValue(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchValue) {
      console.log("Search value is empty");
      return;
    }
    setBooks(await API.searchBooks(searchValue));
  }

  function checkBooks() {
    if (books === undefined) {
      return <h4>Search For A Book To Begin!</h4>;
    }
    if (books === false) {
      return <h4>No Results Found</h4>;
    }
    return books.map((element) => <Result key={element.link} {...element} />);
  }

  return (
    <>
      <form>
        <input placeholder="Type book details..." onChange={handleInputChange} />
        <button type="submit" onClick={handleSubmit}>Search</button>
      </form>

      <h3>Results</h3>
      {checkBooks()}
    </>
  );
}

export default Search;
