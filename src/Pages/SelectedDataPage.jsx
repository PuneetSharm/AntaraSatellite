import React, { useEffect, useState } from "react";

const SelectedDataPage = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const localStorageData = localStorage.getItem("selectedRowData");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setRowData(parsedData);
    }
  }, []);

  return (
    <>
      {rowData.length > 0 && (
        <div className="container mx-auto items-center justify-center mt-4">
          <h1 className="font-bold text-3xl text-center mx-4 my-4">
            Selected Data
          </h1>
          <table className="table-fixed border mx-auto">
            <thead>
              <tr className="border py-2 bg-gray-400">
                <th className="border px-4 py-4">name</th>
                <th className="border px-12 py-4">noradCatId</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((data) => {
                return (
                  <tr className="border bg-blue-50 py-2 px-4" key={data.name}>
                    <td className="border px-4 py-4 ">{data.name}</td>
                    <td className="border px-16 py-2">{data.noradCatId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SelectedDataPage;
