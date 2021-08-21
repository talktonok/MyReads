import React, { Component } from 'react';
import SearchResults from './SearchResult';
//import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

class BooksSearcher extends Component {
  render() {
    const {
      searchBooks,
      books,
      onSearch,
      onResetSearch,
      onMove
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <form action="/">
            <button className="close-search" onClick={onResetSearch}>
              Close
            </button>
          </form>
          <SearchInput onSearch={onSearch} />
        </div>
        <SearchResults
          searchBooks={searchBooks}
          books={books}
          onMove={onMove}
        />
      </div>
    );
  }
}
export default BooksSearcher;
