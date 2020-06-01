import React from "react";
import BookSelf from "./components/BookSelf";

import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NotFound from "./components/NotFound";
import { Link, Route, Switch } from "react-router-dom";


class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    load: true
  };
  setView = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(
          {
            ...this.state,
            books: [...books],
          }, () => { this.setState({ load: false }) }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.setView();
  }

  handleMove = (e, id) => {
    const { value } = e.target;
    console.log(value, id)
    BooksAPI.update({ id }, value)
      .then((book) => {
        this.setView();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log('state', this.state)
    const load = this.state.load;
    let wantToRead, currentlyReading, read;
    let books ;
    if (!load) {
       books = this.state.books;
      wantToRead = books.filter(({ shelf }) => shelf.localeCompare("wantToRead") === 0);
      currentlyReading = books.filter(({ shelf }) => shelf.localeCompare("currentlyReading") === 0);
      read = books.filter(({ shelf }) => shelf.localeCompare("read") === 0);
      console.log('w', wantToRead)
    }
    return (

      <div className="app">
        <Switch>
          <Route exact path='/' render={() => (
            <div className="list-books-content">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {(!load) ?
                <div>
                  <BookSelf  books={currentlyReading} handleMove={this.handleMove} />
                  <BookSelf  books={wantToRead} handleMove={this.handleMove} />
                  <BookSelf  books={read} handleMove={this.handleMove} />
                  <div className="open-search">
                    <Link to="/search">
                      <button>Search</button>
                    </Link>
                  </div>
                </div> : null
              }
            </div>
          )} />
          < Route
            path="/search"
            render={() => (
              <SearchBar userBooks={books} handleMove={this.handleMove}  />
            )} />
          <Route component={NotFound} />

        </Switch>

      </div>
    );
  }
}

export default BooksApp;
