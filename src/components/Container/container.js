import './container.css';
import Sorting from '../Sorting';
import ProductList from '../ProductList';
import Filter from '../Filter';

export default function Container() {
  return (
    <div className="container">
      <Filter />
      <div>
        <Sorting />
        <ProductList />
      </div>
    </div>
  );
}
