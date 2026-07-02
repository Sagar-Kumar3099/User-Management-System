function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by first name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "10px",
        width: "250px",
      }}
    />
  );
}

export default SearchBar;
