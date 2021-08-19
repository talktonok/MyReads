import React from 'react';
//import { render } from 'react-dom';
import ShelfChanger from './ShelfChanger';
/*
Books component: to display books and there thumbnails
*/
const Books = props => {
  const { book, shelf, onMove } = props;
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : 'icons/book-placeholder.svg'
              })`
            }}
          />
          <ShelfChanger book={book} shelf={shelf} onMove={onMove} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.join(', ') : 'Unknown Author'}
        </div>
      </div>
    </li>
  );
};

export default Books;
