import { useState, useEffect } from "react";
import config from "../config";
import '../css/BorrowedBooksTab.css';

const BorrowedBooksTab = ({ customer }) => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const fetchBorrowedBooks = async () => {
        try {
            const response = await fetch(`${config.api.baseURL}/BorrowedBook/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer.passport.toString())
            });
            const data = await response.json();
            console.log(data);
            setBorrowedBooks(data);
        } catch (error) {
            console.error('Error fetching borrowed books:', error);
        }
    }

    const handleReturnBook = async (bookUID) => {
        try {
            const response = await fetch(`${config.api.baseURL}/BorrowedBook/return`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookUID: bookUID,
                    customerPassport: customer.passport
                })
            });
            
            if (response.ok) {
                // Remove the returned book from the state
                setBorrowedBooks(prevBooks => 
                    prevBooks.filter(book => book.bookUID !== bookUID)
                );
            }
        } catch (error) {
            console.error('Error returning book:', error);
        }
    };

    useEffect(() => {
        if (customer) {
            fetchBorrowedBooks();
        }
    }, [customer]);

    return (
        <div className="borrowed-books-container">
            <h3>Borrowed Books</h3>
            {borrowedBooks.length > 0 ? (
                <table className="borrowed-books-table">
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Borrowed On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedBooks.map((book) => (
                            <tr key={book.bookUID}>
                                <td>{book.bookName}</td>
                                <td>{book.author}</td>
                                <td>{new Date(book.borrowedOn).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <button 
                                        className="return-button"
                                        onClick={() => handleReturnBook(book.bookUID)}
                                    >
                                        Return
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-books-message">No borrowed books found.</p>
            )}
        </div>
    );
};

export default BorrowedBooksTab;