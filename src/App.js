import React, { Component } from 'react';
//import { ReactDOM } from 'react';
//import {Route BrowserRouter as Router,} from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { debounce } from 'throttle-debounce';
import BooksList from './BooksList';
import BooksSearcher from './BooksSearcher';

const shelfs = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchBooks: [],
    error: false

    //showSearchPage: false
  };
  /**
   * @description Display books on mount
   */
  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books: books });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  };

  /**
   * @description Execute debounce to search for a book
   */
  findABook = debounce(300, false, query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  /**
   * @description Reset the search input
   */
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  /**
   * @description Function to move a book to a new shelf
   * @param {object} book - The Object of the book
   * @param {object} shelf - The shelf the book will be moved to
   */
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch(err => {
      console.log(err);
      this.setState({ error: true });
    });
    if (shelf === 'none') {
      this.setState(previousState => ({
        books: previousState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(previousState => ({
        books: previousState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  render() {
    const { books, searchBooks, error } = this.state;
    if (error) {
      return <div>Network error. Please try again later.</div>;
    }
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BooksList
              shelfs={shelfs}
              books={books}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BooksSearcher
              searchBooks={searchBooks}
              books={books}
              onSearch={this.findABook}
              onMove={this.moveBook}
              onResetSearch={this.resetSearch}
            />
          )}
        />
      </div>
    );
  }
} //ReactDOM.render(<BooksApp/>, document.getElementById('BooksApp'))

export default BooksApp;
