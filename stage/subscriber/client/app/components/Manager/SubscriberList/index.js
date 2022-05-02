/**
 *
 * Subscriber List
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const SubscriberList = props => {
  const { subscribers } = props;

  return (
    <div className='f-list'>
      { subscribers.map((item, index) => (
        <Link
          to={`/dashboard/subscriber/edit/${item._id}`}
          key={index}
          className='d-block mb-3 p-4 subscriber-box'
        >
          <div className='d-flex align-items-center justify-content-between mb-2'>
            <h4 className='mb-0'>{item.name}</h4>
          </div>
          <p className='mb-2 subscriber-desc'>{item.description}</p>
        </Link>
      )) }
    </div>
  );
};

export default SubscriberList;
