/**
 *
 * Credit List
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const CreditList = props => {
  const { credits } = props;

  return (
    <div className='f-list'>
      { credits.map((item, index) => (
        <Link
          to={`/dashboard/credit/edit/${item._id}`}
          key={index}
          className='d-block mb-3 p-4 credit-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{item.name}</h4>
          </div>
          <p className='mb-2 credit-desc'>{item.description}</p>
        </Link>
      )) }
    </div>
  );
};

export default CreditList;
