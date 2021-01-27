import './button.css';

export default function Button({
  numberTicketsToShow,
  setNumberTicketsToShow,
}) {
  return (
    <div
      className="button"
      onClick={() => setNumberTicketsToShow(numberTicketsToShow + 10)}
    >
      <span>Показать еще 10 билетов</span>
    </div>
  );
}
