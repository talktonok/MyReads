import React, { Component } from 'react';

class SearchInput extends Component {
  state = {
    value: ''
  };
  changeHandler = event => {
    // this.setState({ value: event.target.value });
    const val = event.target.value;
    this.setState({ value: val }, () => {
      // console.log(val);
      // if (val.length >= 1) {
      this.props.onSearch(val);
      // }
    });
  };
  render() {
    return (
      /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
      <div className="search-books-input-wrapper">
        <input
          type="text"
          value={this.state.value}
          placeholder="Search by title or author"
          onChange={this.changeHandler}
          autoFocus
        />
      </div>
    );
  }
}

export default SearchInput;
