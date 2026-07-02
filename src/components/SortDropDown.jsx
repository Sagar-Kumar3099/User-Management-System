function SortDropDown({ sortOrder, setSortOrder }) {
  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      style={{ padding: "10px" }}
    >
      <option value="">Sort By</option>

      <option value="firstAsc">First Name ↑</option>

      <option value="firstDesc">First Name ↓</option>

      <option value="emailAsc">Email ↑</option>

      <option value="emailDesc">Email ↓</option>
    </select>
  );
}

export default SortDropdown;
