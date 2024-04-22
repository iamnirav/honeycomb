import Token from '@/app/map/Token';

export default function Map() {

  const defaultNumRows = 8;
  const defaultNumCols = 8;

  const rows = [];
  for (let i = 0; i < defaultNumRows; i++) {
      const hexes = [];

      for (let i = 0; i < defaultNumCols; i++) {
        hexes.push(<div className="hex" key={i} />);
      }

      rows.push(<div className="hex-row" key={i}>{hexes}</div>);
  }

  return (
    <main className="p-4">
      <Token />
      <div className="hex-grid flow-root">
        {rows}
      </div>
    </main>
  );
}
