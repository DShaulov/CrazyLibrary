import { useState } from "react";

const BorrowedBooksTab = ({ customer }) => {
    return (
        <div>
            <h1>BorrowedBooksTab</h1>
            <h2>{customer.firstName} {customer.lastName}</h2>
        </div>
    );
};

export default BorrowedBooksTab;