import React from "react";
import { FixedSizeList as List } from "react-window";

const VirtualizedTable = ({
  data,
  height = 450,
  rowHeight = 50,
  handleSelectedRows,
  selectedRows,
}) => {
  const Row = ({ index, style }) => {
    const row = data[index];
    return (
      <div
        style={style}
        className={`flex items-center px-4 text-sm border-b w-full ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <div className="w-10 px-2 flex justify-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600"
            checked={selectedRows.includes(index)}
            onChange={() => handleSelectedRows(row, index)}
          />
        </div>
        <div className="w-1/6 truncate">{row.name}</div>
        <div className="w-1/6 truncate">{row.noradCatId}</div>
        <div className="w-1/6 truncate">{row.orbitCode}</div>
        <div className="w-1/6 truncate">{row.objectType}</div>
        <div className="w-1/6 truncate">{row.countryCode}</div>
        <div className="w-1/6 truncate">{row.launchDate}</div>
      </div>
    );
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden w-full text-gray-800">
      {/* Table Header */}
      <div className="flex items-center px-4 py-2 bg-gray-100 text-sm font-semibold border-b">
        <div className="w-10 px-2"></div>
        <div className="w-1/6">Name</div>
        <div className="w-1/6">NoradCatId</div>
        <div className="w-1/6">OrbitCode</div>
        <div className="w-1/6">ObjectType</div>
        <div className="w-1/6">CountryCode</div>
        <div className="w-1/6">LaunchDate</div>
      </div>

      {/* Virtualized Rows */}
      <List height={height} itemCount={data.length} itemSize={rowHeight} width="100%">
        {Row}
      </List>
    </div>
  );
};

export default VirtualizedTable;
