import styles from './sorting.module.css';
import cn from 'classnames';

export default function Sorting(props) {
  const { filterTickets, setFilterTickets } = props;
  // console.log('props=', props);
  const { cheapest, fastest } = filterTickets;
  const isActiveCheapest = cheapest;
  const isActiveFastest = fastest;
  // const isActiveCheapest = true;
  // const isActiveFastest = false;

  // console.log('filterTickets=', filterTickets);

  return (
    <ul className={styles.sorting}>
      <li
        onClick={() =>
          setFilterTickets({ ...filterTickets, cheapest: true, fastest: false })
        }
        className={cn(styles['sorting__tab'], {
          [styles['is-active']]: isActiveCheapest,
        })}
      >
        <span className={styles['sorting__title-wrap']}>Самый дешевый</span>
      </li>
      <li
        onClick={() =>
          setFilterTickets({ ...filterTickets, cheapest: false, fastest: true })
        }
        className={cn(styles['sorting__tab'], {
          [styles['is-active']]: isActiveFastest,
        })}
      >
        <span className={styles['sorting__title-wrap']}>Самый быстрый</span>
      </li>
    </ul>
  );
}
