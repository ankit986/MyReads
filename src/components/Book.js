import React from 'react'

export default function Book({currentShelf, book:{id, imageLinks, title, authors , shelf},handleMove}) {
  return (
        <div  className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${!(typeof imageLinks==='undefined')?(imageLinks.thumbnail):''}")` }} />
          <div className="book-shelf-changer">
            <select name='moveBook' onChange={e=>handleMove(e,id)} value='move'>
              <option value="move" disabled>
                Move to...
              </option>
              <option disabled={"currentlyReading" ===shelf} value="currentlyReading">Currently Reading</option>
              <option disabled={"wantToRead" ===shelf} value="wantToRead">Want to Read</option>
              <option disabled={"read" ===shelf} value="read">Read</option>
              <option disabled={!shelf} value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{(authors)?authors.map((author) => author):null}</div>
      </div>
    )
}
