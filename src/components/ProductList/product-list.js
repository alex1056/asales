import './product-list.css';
import TicketCard from '../TicketCard';

export default function ProductList() {
  return (
    <div className="product-list">
      <TicketCard />
      <TicketCard />
    </div>
  );
}
