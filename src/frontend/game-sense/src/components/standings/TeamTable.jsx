import TeamInfo from './TeamInfo';
import PropTypes from "prop-types";

export default function TeamTable({ standings }) {
  console.log("team table component");
  return (
    <div>
      <div className="overflow-x-auto rounded-xl">
        <table className="table-auto w-full text-sm text-left" style={{ tableLayout: 'fixed' }}>
          {/* Column Group to Define Widths */}
          <colgroup>
            <col style={{ width: '10%' }} /> {/* Position */}
            <col style={{ width: '30%' }} /> {/* Club */}
            <col style={{ width: '7%' }} /> {/* MP */}
            <col style={{ width: '7%' }} /> {/* Points */}
            <col style={{ width: '7%' }} /> {/* GD */}
            <col style={{ width: '7%' }} /> {/* W */}
            <col style={{ width: '7%' }} /> {/* D */}
            <col style={{ width: '7%' }} /> {/* L */}
          </colgroup>

          {/* Table Header */}
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-2 py-2 text-center">#</th>
              <th className="px-2 py-2">Club</th>
              <th className="px-2 py-2 text-center">MP</th>
              <th className="px-2 py-2 text-center">W</th>
              <th className="px-2 py-2 text-center">D</th>
              <th className="px-2 py-2 text-center">L</th>
              <th className="px-2 py-2 text-center">GD</th>
              <th className="px-2 py-2 text-center">P</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {standings.map((team, index) => (
              <TeamInfo key={index} team={team} />
            ))}
          </tbody>
        </table>
      </div>
      <div className='pb-28'></div>
    </div>

  );

}

TeamTable.propTypes = {
  standings: PropTypes.array.isRequired,
  showHeader: PropTypes.bool,

};
