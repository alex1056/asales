import './container.css';
import React, { useEffect, useState } from 'react';
import Sorting from '../Sorting';
import ProductList from '../ProductList';
import Filter from '../Filter';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { loadTickets } from '../../redux/actions';
import {
  ticketsSelector,
  ticketsLoadingSelector,
  ticketsLoadedSelector,
  allCheapiestSelector,
  allFastestSelector,
} from '../../redux/selectors';
import Button from '../Button';

function Container(props) {
  const {
    loadTicketsLocal,
    ticketsSelector,
    ticketsCheapiest,
    ticketsFastest,
  } = props;
  let tickets = [];
  let ticketsArr = [];
  console.log('props=', props);
  const [numberTicketsToShow, setNumberTicketsToShow] = useState(10);
  const [filterTickets, setFilterTickets] = useState({
    showAll: true,
    show1Stop: false,
    show2Stops: false,
    show3Stops: false,
    cheapest: true,
    fastest: false,
  });
  // console.log('tickets=', tickets);

  const TicketsToShow = (tickets, numberTicketsToShow) => {
    // console.log('numberTicketsToShow=', numberTicketsToShow);
    const arrKeys = Object.keys(tickets).slice(0, numberTicketsToShow);
    // let i = 0;
    const newArr = arrKeys.map((key) => tickets[key]);

    // console.log('newArr=', newArr);
    return newArr;
  };
  tickets = chooseTicketsSelector(
    filterTickets,
    ticketsCheapiest,
    ticketsFastest,
    ticketsSelector
  );
  ticketsArr = TicketsToShow(tickets, numberTicketsToShow);

  useEffect(() => {
    loadTicketsLocal();
  });

  return (
    <div className="container">
      <Filter
        filterTickets={filterTickets}
        setFilterTickets={setFilterTickets}
      />
      <div>
        <Sorting
          filterTickets={filterTickets}
          setFilterTickets={setFilterTickets}
        />
        <ProductList ticketsArr={ticketsArr} />
        <Button
          numberTicketsToShow={numberTicketsToShow}
          setNumberTicketsToShow={setNumberTicketsToShow}
        />
      </div>
    </div>
  );
}

const chooseTicketsSelector = (
  filterTickets,
  ticketsCheapiest,
  ticketsFastest,
  ticketsSelector
) => {
  const {
    showAll,
    show1Stop,
    show2Stops,
    show3Stops,
    cheapest,
    fastest,
  } = filterTickets;

  ///
  if (showAll) {
    if (cheapest) return ticketsCheapiest;
    else return ticketsFastest;
  } else return ticketsSelector; // временно
  ///
  // if (show1Stop && !show2Stop && !show3Stop) {
  //   if (cheapest) return show1StopCheapiestSelector;
  //   else return show1StopFastestSelector;
  // }
};

const mapStateToProps = createStructuredSelector({
  tickets: ticketsSelector,
  ticketsCheapiest: allCheapiestSelector,
  ticketsFastest: allFastestSelector,
  loading: ticketsLoadingSelector,
  loaded: ticketsLoadedSelector,
});

const mapDispatchToProps = {
  loadTicketsLocal: loadTickets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
