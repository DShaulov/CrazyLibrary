import logo from './logo.svg';
import './css/App.css';
import config from './config';
import { useState } from 'react';
import CustomersTab from './components/CustomersTab';
import BooksTab from './components/BooksTab';
import ReportsTab from './components/ReportsTab';

function App() {
  const [activeTab, setActiveTab] = useState('customers');

  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomersTab />;
      case 'books':
        return <BooksTab />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <CustomersTab />;
    }
  };

  async function sendPostRequest() {
    const url = `${config.api.baseURL}/BookSearch/001d4e85-0cc4-436a-aaaa-a5b704fb7c38/stats`;
    
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  sendPostRequest();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Crazy Library</h1>
      </header>
      <div className="tab-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => handleTabClick('customers')}
          >
            Customers
          </button>
          <button 
            className={`tab ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => handleTabClick('books')}
          >
            Books
          </button>
          <button 
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => handleTabClick('reports')}
          >
            Reports
          </button>
        </div>
        <div className="content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
