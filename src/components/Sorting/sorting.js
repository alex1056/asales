import styles from './sorting.module.css';
import cn from 'classnames';

export default function Sorting({
  isActiveCheapest = true,
  isActiveFastest = false,
}) {
  return (
    <ul className={styles.sorting}>
      <li
        className={cn(styles['sorting__tab'], {
          [styles['is-active']]: isActiveCheapest,
        })}
      >
        <span className={styles['sorting__title-wrap']}>Самый дешевый</span>
      </li>
      <li
        className={cn(styles['sorting__tab'], {
          [styles['is-active']]: isActiveFastest,
        })}
      >
        <span className={styles['sorting__title-wrap']}>Самый быстрый</span>
      </li>
    </ul>
  );
}
