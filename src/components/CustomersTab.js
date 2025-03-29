import { useState } from 'react';
import '../css/CustomersTab.css';
import BorrowedBooksTab from './BorrowedBooksTab';
import config from '../config';


const CustomersTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerMatches, setCustomerMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value)
    console.log(searchQuery);
    if (e.target.value.length === 0) {
      setCustomerMatches([]);
      setSelectedCustomer(null);
      setShowDropdown(false);
      return;
    }
    try {
      const parsedQuery = parseSearchQuery(e.target.value);
      const response = await fetch(`${config.api.baseURL}/CustomerSearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedQuery)
      });

      if (response.status === 404) {
        setCustomerMatches([]);
        setSelectedCustomer(null);
        setShowDropdown(false);
        return;
      }

      const data = await response.json();
      console.log(data);
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
      // Check if it's a number or a string containing only numbers
      if (/^\d+$/.test(part.toString())) {
        if (part.toString().startsWith('0')) {
          result.phone = part.toString();
        } 
        else {
          result.passport = part.toString();
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
        
        {showDropdown && customerMatches.length > 0 && (
          <div className="search-dropdown">
            {/* Displays the first X results, where X is defined in config.search.resultDisplayNum */}
            {customerMatches.slice(0, config.search.resultDisplayNum).map((customer) => (
              <div 
                key={customer.passport} 
                className="dropdown-item"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setShowDropdown(false);
                }}
              >
                <span className="customer-name">
                  {customer.firstName} {customer.lastName}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedCustomer && (
        <div className="customer-details">
          <h3>Customer Information</h3>
          <div className="customer-info">
          <div className="info-row">
            <label>Name:</label>
            <span>{selectedCustomer ? selectedCustomer.firstName : '—'}</span>
          </div>
          <div className="info-row">
            <label>Last Name:</label>
            <span>{selectedCustomer ? selectedCustomer.lastName : '—'}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{selectedCustomer ? selectedCustomer.email : '—'}</span>
          </div>
          <div className="info-row">
            <label>Date of Birth:</label>
            <span>
              {/* Strip the time from the date */} 
              {selectedCustomer 
                ? new Date(selectedCustomer.birthDate).toLocaleDateString('en-GB')
                : '—'
              }
            </span>
          </div>
          <div className="info-row">
            <label>Address:</label>
            <span>{selectedCustomer ? selectedCustomer.address : '—'}</span>
            </div>
          </div>
          <BorrowedBooksTab customer={selectedCustomer}/>
        </div>
      )}
    </div>
  );
};

export default CustomersTab;