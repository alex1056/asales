import './segments.css';

export default function Segments({
  line1 = 'MOW - НКТ',
  line2 = '10:48 - 8:05',
}) {
  return (
    <div className="segments">
      <p className="segment__firts-line">{line1}</p>
      <p className="segment__second-line">{line2}</p>
    </div>
  );
}
