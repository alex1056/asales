import './ticket-card.css';
import Segments from './Segments';
import Img from './s7.png';

export default function TicketCard() {
  return (
    <div className="ticket-card">
      <div className="ticket-card__container">
        <div>
          <p className="ticket-card__price">12 700</p>
        </div>
        <div></div>
        <div>
          <img src={Img} alt="Img" />
        </div>

        <Segments line1="MOW - НКТ" line2="10:48 - 8:05" />
        <Segments line1="В ПУТИ" line2="21ч 15м" />
        <Segments line1="2 ПЕРЕСАДКИ" line2="HKG, JNB" />

        <Segments line1="MOW - НКТ" line2="10:48 - 8:05" />
        <Segments line1="В ПУТИ" line2="21ч 15м" />
        <Segments line1="2 ПЕРЕСАДКИ" line2="HKG, JNB" />

        {/* <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>

        <div>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <div>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div>

        <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>

        <div>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <div>
          <span>7</span>
          <span>8</span>
          <span>9</span>
        </div> */}
      </div>
    </div>
  );
}
