const Delta = ({ delta }) => {
  let deltaUI = <span className="delta text-secondary small">⬤ 0</span>;
  if (delta > 0) {
    deltaUI = (
      <span className="delta text-success small">▲ {parseInt(delta)}</span>
    );
  } else if (delta < 0) {
    deltaUI = (
      <span className="delta text-danger small">▼ {parseInt(delta)}</span>
    );
  }
  return deltaUI;
};

export default Delta;
