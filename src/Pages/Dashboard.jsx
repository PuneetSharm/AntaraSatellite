import { useEffect, useState } from "react";
import Search from "../Components/Search";
import { searchDataPoint } from "../services/SearchService";
import {
  typeOptions,
  orbitalCodeOptions,
  sortOptions,
  sortBasedOnName,
  filterDataBasedOnObjectType,
} from "../util/helper";
import MultiSelectDropdown from "../Components/MultiSelectDropdown";
import VirtualizedTable from "../Components/VirtualisedTable";
import SortDropdown from "../Components/SortDropDown";
import Spinner from "../Components/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [searchValues, setSearchValues] = useState({
    name: "",
    noRadCatId: "",
  });
  const [dataPoint, setDataPoint] = useState([]);
  const [overallDataPoint, setOverallDataPoint] = useState([]);
  const [selectedValuesObjectType, setSelectedValuesObjectType] = useState([]);
  const [selectedValuesOrbitalType, setSelectedValuesOrbitalType] = useState(
    []
  );

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [errorSelectedRows, setErrorSelectedRows] = useState("");
  const [sortedSelectedValue, setSortedSelectedValue] = useState("SNASC");
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [responseError, setResponseError] = useState(null);

  const isDisabled =
    selectedValuesObjectType.length === 0 &&
    selectedValuesOrbitalType.length === 0;

  useEffect(() => {
    const getDataPoints = async () => {
      setIsLoading(true);
      setResponseError(null);
      const dataPointResponse = await searchDataPoint();
      if (dataPointResponse?.message !== "OK") {
        const errorMessage = dataPointResponse?.message;
        const errorStatus = dataPointResponse?.status;
        setResponseError({ errorMessage, errorStatus });
        setIsLoading(false);
        return;
      } else {
        const data = dataPointResponse?.data;
        const sortedResponse = sortBasedOnName(data, sortedSelectedValue);
        setDataPoint(sortedResponse);
        setOverallDataPoint(sortedResponse);
        setIsLoading(false);
      }
    };
    getDataPoints();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectedRows = (rowData, index) => {
    const alreadySelected = selectedRows.includes(index);
    if (alreadySelected) {
      const updatedIndexes = selectedRows.filter((i) => i !== index);
      setSelectedRows(updatedIndexes);
      const updatedData = selectedRowData.filter(
        (item) => item.id !== rowData.id
      );
      setSelectedRowData(updatedData);
      setErrorSelectedRows("");
      return;
    }

    if (selectedRows.length >= 10) {
      setErrorSelectedRows("Selection limit exceeded. Max allowed is 10.");
      return;
    }

    setSelectedRows([...selectedRows, index]);
    setSelectedRowData([...selectedRowData, rowData]);
    setErrorSelectedRows("");
  };

  const handleSearchClick = () => {
    const resultedInputSearch = overallDataPoint?.filter((item) => {
      const inputName = searchValues.name.trim().toLowerCase();
      const inputNoRadCatId = searchValues.noRadCatId.trim();
      const matchName = inputName
        ? item.name.toLowerCase().startsWith(inputName)
        : true;
      const matchNoRadCatId = inputNoRadCatId
        ? item.noradCatId.startsWith(searchValues.noRadCatId)
        : true;
      return matchName && matchNoRadCatId;
    });
    setDataPoint(resultedInputSearch);
  };

  const handleSelectedFilter = () => {
    if (selectedValuesObjectType.length > 0) {
      const filteredData = filterDataBasedOnObjectType(
        overallDataPoint,
        selectedValuesObjectType
      );
      if (selectedValuesOrbitalType.length > 0) {
        const filteredDataAfterOrbital = filterByOrbitalCode(
          filteredData,
          selectedValuesOrbitalType
        );
        setDataPoint(filteredDataAfterOrbital);
      } else {
        setDataPoint(filteredData);
      }
    } else if (selectedValuesOrbitalType.length > 0) {
      const filteredDataAfterOrbital = filterByOrbitalCode(
        overallDataPoint,
        selectedValuesOrbitalType
      );
      setDataPoint(filteredDataAfterOrbital);
    }
  };

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleChangeSorting = (e) => {
    setSortedSelectedValue(e.target.value);
    const sortedResponse = sortBasedOnName(dataPoint, e.target.value);
    setDataPoint(sortedResponse);
  };

  const handleProceed = () => {
    if (selectedRowData.length > 0) {
      localStorage.setItem("selectedRowData", JSON.stringify(selectedRowData));
    }
    const url = `${window.location.origin}/selectedData`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <Search
          inputValue={searchValues}
          handleInputChange={handleInputChange}
          handleClick={handleSearchClick}
          handleSearchInput={handleSearchInput}
        />
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-6 p-4 bg-white shadow-sm border border-gray-200 rounded-md">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700">
            Filter by Object Type:
          </p>
          <MultiSelectDropdown
            options={typeOptions}
            selectedValues={selectedValuesObjectType}
            onChange={setSelectedValuesObjectType}
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-700">
            Filter by Orbital Code:
          </p>
          <MultiSelectDropdown
            options={orbitalCodeOptions}
            selectedValues={selectedValuesOrbitalType}
            onChange={setSelectedValuesOrbitalType}
          />
        </div>

        <button
          onClick={handleSelectedFilter}
          disabled={isDisabled}
          className={`px-6 py-2 text-sm rounded-md transition ${
            isDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          Filter
        </button>
      </div>

      {/* Sort & Count Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {dataPoint?.length > 0 && (
          <p className="text-sm text-gray-700 font-medium">
            Showing total count: {dataPoint.length}
          </p>
        )}
        <SortDropdown
          label="Sort"
          options={sortOptions}
          selectedValue={sortedSelectedValue}
          handleChange={handleChangeSorting}
        />
      </div>

      {/* Error Handling */}
      {responseError && (
        <div className="flex flex-col items-center justify-center p-6 border border-red-300 bg-red-50 rounded-md text-center space-y-2">
          <h1 className="text-xl font-bold text-red-500">Error Response</h1>
          <p className="text-base">Status: {responseError.errorStatus}</p>
          <p className="text-base">Message: {responseError.errorMessage}</p>
        </div>
      )}

      {/* Table + Selection Info */}
      {!isLoading && !responseError && (
        <div className="flex flex-col gap-2 bg-white border border-gray-200 rounded-md shadow-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium text-gray-700">
              Selected: {selectedRows.length} / 10
            </p>
            {selectedRows.length > 0 && (
              <button
                onClick={handleProceed}
                className="px-6 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md"
              >
                Proceed
              </button>
            )}
          </div>
          {errorSelectedRows && (
            <p className="text-sm text-red-500">{errorSelectedRows}</p>
          )}
        </div>
      )}

      {/* Data Table or Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        !responseError && (
          <div className="flex flex-col w-full bg-white shadow-sm border border-gray-200 rounded-md overflow-hidden">
            <VirtualizedTable
              data={dataPoint}
              handleSelectedRows={handleSelectedRows}
              selectedRows={selectedRows}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
