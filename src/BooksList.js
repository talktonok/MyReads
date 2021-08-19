import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelfs from './Shelfs';

class BooksList extends Component {
  render() {
    const { shelfs, books, onMove } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map(shelf => (
              <Shelfs
                key={shelf.key}
                shelf={shelf}
                books={books}
                onMove={onMove}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">
            <button>Add a Book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default BooksList;
