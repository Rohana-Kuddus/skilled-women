import "../styles/components/Arrow.css"

function Arrow({ flip }) {
  return (
    <div className={flip ? 'scale-x-[-1]' : ''}>
      <div className="arrow x-line"></div>
      <div className="arrow y-line"></div>
      <div className="arrow down"></div>
    </div>
  );
}

export default Arrow;