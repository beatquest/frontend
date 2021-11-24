import cm from '../images/cm.svg';
import qm from '../images/qm.svg';
import bm from '../images/bm.svg';
import sm from '../images/sm.svg';
import lm from '../images/lm.svg';

const Rank = ({ rank }) => {
  const color = {
    CM: '#e47d22',
    QM: '#cfd2d3',
    BM: '#f0f328',
    SM: '#a0ddd1',
    LM: '#51ebfd',
  }[rank];

  const icon = {
    CM: cm,
    QM: qm,
    BM: bm,
    SM: sm,
    LM: lm,
  }[rank];

  return (
    <>
      {rank !== 'N' && (
        <span
          className="badge badge-secondary"
          style={{ backgroundColor: color }}
        >
          <span class="icon">
            <img alt={rank} src={icon} />
          </span>
          <span>{rank}</span>
        </span>
      )}
    </>
  );
};

export default Rank;
