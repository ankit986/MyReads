import * as BooksAPI from '../BooksAPI'
import React, { Component } from 'react'
import Book from './Book';
import { Link } from 'react-router-dom'


export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      load: true
    }
  }
  handleSearch = (e) => {
    const {userBooks} = this.props
    BooksAPI.search(this.state.query)
    .then((books) => {
      Object.entries(books).map(book=>{
        Object.entries(userBooks).map(userBook =>{
          if(userBook[1].title === book[1].title){
            book[1]['shelf'] = userBook[1].shelf 
          }
        })
      })
      this.setState({
        books: [...books]
      }, () => { this.setState({ load: false }) })
    }).catch((err) => { console.log(err); })

  }
  render() {
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input value={this.state.query} type="text" placeholder="Search by title or author" onChange={e => this.setState({ query: e.target.value })} />
          </div>
          <button className="search-button" onClick={this.handleSearch}>
            Search
          </button>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(!this.state.load) ? this.state.books.map((book) => (<Book  book={book} key={book.id} handleMove={this.props.handleMove} />)) : null}
          </ol>
        </div>
      </div>
    )
  }
}



