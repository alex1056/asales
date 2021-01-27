import './product-list.css';
import React, { useEffect } from 'react';
import TicketCard from '../TicketCard';

export default function ProductList(props) {
  // const { loadTicketsLocal } = props;
  // console.log('props=', props);
  const { ticketsArr } = props;
  // console.log('ticketsArr', ticketsArr);
  // const newArrMap = ticketsArr.map((elem) => elem);
  // console.log('newArrMap=', newArrMap);
  // useEffect(() => {
  //   loadTicketsLocal();
  // });

  return (
    <div className="product-list">
      {ticketsArr.map((elem, i) => (
        <TicketCard key={i} ticket={elem}></TicketCard>
      ))}
    </div>
  );
}
