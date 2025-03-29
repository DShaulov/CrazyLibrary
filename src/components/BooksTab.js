import { useState } from 'react';
import config from '../config';
import '../css/BooksTab.css';

const BooksTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookMatches, setBookMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const parseSearchQuery = (queryString) => {
    const result = {
      bookName: '',
      authorFirstName: '',
      authorLastName: ''
    };
    
    if (!queryString || queryString.trim() === '') {
      return result;
    }
    
    const parts = queryString.trim().split(/\s+/);
    
    if (parts.length > 0) {
      result.bookName = parts[0];
    }
    
    if (parts.length > 1) {
      result.authorFirstName = parts[1];
    }
    
    if (parts.length > 2) {
      result.authorLastName = parts[2];
    }
    
    return result;
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value)
    console.log(searchQuery);
    if (e.target.value.length === 0) {
      setBookMatches([]);
      setShowDropdown(false);
      return;
    }
    try {
      const parsedQuery = parseSearchQuery(e.target.value);
      const response = await fetch(`${config.api.baseURL}/BookSearch/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedQuery)
      });

      if (response.status === 404) {
        setBookMatches([]);
        setShowDropdown(false);
        return;
      }

      const data = await response.json();
      console.log(data);
      setBookMatches(data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error searching for books:', error);
      setBookMatches([]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="books-tab">
      <div className="search-section">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for book..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        
        {showDropdown && bookMatches.length > 0 && (
          <div className="search-dropdown">
            {bookMatches.slice(0, config.search.resultDisplayNum).map((book) => (
              <div 
                key={book.bookUID} 
                className="dropdown-item"
                onClick={() => {
                  setSelectedBook(book);
                  setShowDropdown(false);
                }}
              >
                <span className="book-name">
                  {book.title}
                </span>
                <span className="book-details">
                  by {book.author.firstName} {book.author.lastName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <div className="book-info">
          <h3>Book Information</h3>
          <div className="info-row">
            <label>Title:</label>
            <span>{selectedBook.title}</span>
          </div>
          <div className="info-row">
            <label>Author:</label>
            <span>{selectedBook.author.firstName} {selectedBook.author.lastName}</span>
          </div>
          <div className="info-row">
            <label>UID:</label>
            <span>{selectedBook.uniqueID}</span>
          </div>
          <div className="info-row">
            <label>Publication Date:</label>
            <span>{selectedBook.publicationDate}</span>
          </div>
          <div className="info-row">
            <label>Library Call Number:</label>
            <span>{selectedBook.libraryCallNumber}</span>
          </div>
          <div className="info-row">
            <label>Total Copies :</label>
            <span>{selectedBook.totalCopies}</span>
          </div>
          <div className="info-row">
            <label>Copies Available:</label>
            <span>{selectedBook.copiesAvailable}</span>
          </div>
          <div className="info-row">
            <label>Times Borrowed:</label>
            <span>{selectedBook.borrowCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksTab;