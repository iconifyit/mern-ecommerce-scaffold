/**
 *
 * Transaction List
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const TransactionList = props => {
  const { transactions } = props;

  return (
    <div className='f-list'>
      { transactions.map((item, index) => (
        <Link
          to={`/dashboard/transaction/edit/${item._id}`}
          key={index}
          className='d-block mb-3 p-4 transaction-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{item.name}</h4>
          </div>
          <p className='mb-2 transaction-desc'>{item.description}</p>
        </Link>
      )) }
    </div>
  );
};

export default TransactionList;
