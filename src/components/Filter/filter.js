import './filter.css';

export default function Filter(props) {
  const { filterTickets, setFilterTickets } = props;
  const {
    showAll,
    show1Stop,
    show2Stops,
    show3Stops,
    cheapest,
    fastest,
  } = filterTickets;
  return (
    <div className="filter">
      <div className="filter__changes">
        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_1-all"
            />
            <label
              onClick={() =>
                setFilterTickets({
                  ...filterTickets,
                  showAll: !showAll,
                })
              }
              className="checkbox__label"
              htmlFor="checkbox_1-all"
            >
              Все
            </label>
          </div>
        </div>

        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_2"
            />
            <label className="checkbox__label" htmlFor="checkbox_2">
              Без пересадок
            </label>
          </div>
        </div>

        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_3"
            />
            <label className="checkbox__label" htmlFor="checkbox_3">
              1 пересадка
            </label>
          </div>
        </div>

        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_4"
            />
            <label className="checkbox__label" htmlFor="checkbox_4">
              2 пересадки
            </label>
          </div>
        </div>

        <div className="checkbox-wrapper">
          <div className="checkbox">
            <input
              className="checkbox__input"
              type="checkbox"
              id="checkbox_5"
            />
            <label className="checkbox__label" htmlFor="checkbox_5">
              3 пересадки
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
