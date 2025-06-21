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
          <div className="rounded-md mx-4 my-4 border border-gray-200">
            <table className=" border border-gray-200 rounded-md w-full text-gray-800">
              <thead>
                <tr className="w-1/2 border py-2 bg-gray-400">
                  <th className="w-1/2 border px-4 py-4 text-center">name</th>
                  <th className="w-1/2 border px-4 py-4 text-center">
                    noradCatId
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowData.map((data) => {
                  return (
                    <tr
                      className="w-1/2 border odd:bg-white even:bg-gray-50 py-2 px-4"
                      key={data.name}
                    >
                      <td className="w-1/2 border px-4 py-4 text-center ">
                        {data.name}
                      </td>
                      <td className="w-1/2 border px-4 py-4 text-center">
                        {data.noradCatId}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedDataPage;
