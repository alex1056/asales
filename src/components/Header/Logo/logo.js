import LogoText from './Logo-text';
import LogoImg from './Logo-img';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <LogoImg />
      <LogoText />
    </div>
  );
}
