const Search = ({
  inputValue,
  handleInputChange,
  handleClick,
  handleSearchInput,
}) => {
  return (
    <div className="flex w-auto border shadow-md px-2 py-2 mx-2 my-2 items-center gap-4">
      <div>
        <label htmlFor="name">Name</label>
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

      <label htmlFor="noRadCatId">NoRadCatId</label>
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
      <button
        type="submit"
        className="px-12 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};
export default Search;
