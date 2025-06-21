const Search = ({
  inputValue,
  handleInputChange,
  handleClick,
  handleSearchInput,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-4 bg-white shadow-sm border border-gray-200 rounded-md">
      <div className="px-2 py-2">
        <label className="text-sm font-medium text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          placeholder="Enter Name..."
          type="text"
          value={inputValue.name}
          name="name"
          className="mx-2 rounded-md border border-gray-300 px-2 py-2"
          onChange={handleInputChange}
          onKeyDown={handleSearchInput}
        />
      </div>
      <div className="px-2 py-2">
        <label
          className="text-sm font-medium text-gray-700"
          htmlFor="noRadCatId"
        >
          NoRadCatId
        </label>
        <input
          id="noRadCatId"
          type="text"
          value={inputValue.noRadCatId}
          name="noRadCatId"
          placeholder="Enter noRadCatId here ..."
          className="mx-2 rounded-md border border-gray-300 px-2 py-2"
          onChange={handleInputChange}
          onKeyDown={handleSearchInput}
        />
      </div>
      <div className="px-2 py-2">
        <button
          type="submit"
          className="px-12 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          onClick={handleClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};
export default Search;
