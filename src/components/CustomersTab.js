import { useState } from 'react';
import '../css/CustomersTab.css';
import BorrowedBooksTab from './BorrowedBooksTab';


const CustomersTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerMatches, setCustomerMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value)
    console.log(searchQuery);
    try {
      const response = await fetch(``);
      const data = await response.json();
      setCustomerMatches(data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error searching for customers:', error);
      setCustomerMatches([]);
    }
  };

  const parseSearchQuery = (queryString) => {
    const result = {
      firstName: '',
      lastName: '',
      phone: '',
      passport: ''
    };
    
    if (!queryString || queryString.trim() === '') {
      return result;
    }
    
    // Split the query string into individual parts
    const parts = queryString.trim().split(/\s+/);
    
    // Process each part of the query
    parts.forEach(part => {
      // Check if it's a number
      if (/^\d+$/.test(part)) {
        if (part.startsWith('0')) {
          result.phone = part;
        } 
        else {
          result.passport = part;
        }
      }
      // Otherwise, it's part of a name
      else {
        // If firstName is empty, assign it there
        if (!result.firstName) {
          result.firstName = part;
        }
        else {
          result.lastName = part;
        }
      }
    });
    
    return result;

  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // TODO
  };

  return (
    <div className="customers-tab">
      <div className="search-section">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for customer..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <div className="customer-details">
        <h3>Customer Information</h3>
        <div className="customer-info">
          <div className="info-row">
            <label>Name:</label>
            <span>{selectedCustomer ? selectedCustomer.name : '—'}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{selectedCustomer ? selectedCustomer.email : '—'}</span>
          </div>
          <div className="info-row">
            <label>Date of Birth:</label>
            <span>{selectedCustomer ? selectedCustomer.dob : '—'}</span>
          </div>
          <div className="info-row">
            <label>Address:</label>
            <span>{selectedCustomer ? selectedCustomer.address : '—'}</span>
          </div>
        </div>
        <BorrowedBooksTab/>
      </div>
    </div>
  );
};

export default CustomersTab;