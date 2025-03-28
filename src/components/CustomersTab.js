import { useState } from 'react';
import '../css/CustomersTab.css';
import BorrowedBooksTab from './BorrowedBooksTab';


const CustomersTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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