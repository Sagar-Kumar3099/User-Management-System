import { useEffect, useState } from "react";
import api from "./services/api";

import UserForm from "./components/UserForm";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import UserTable from "./components/UserTable";
import SearchBar from "./components/SearchBar";
import SortDropDown from "./components/SortDropDown";
import Pagination from "./components/Pagination";
import FilterModal from "./components/FilterModal";

import "./styles/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const response = await api.get("/users");

      const formattedUsers = response.data.map((user) => {
        const names = user.name.split(" ");

        return {
          id: user.id,
          firstName: names[0],
          lastName: names.slice(1).join(" "),
          email: user.email,
          department: "Engineering",
        };
      });

      setUsers(formattedUsers);
      setError("");
    } catch (err) {
      setError("Unable to fetch users.");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setShowForm(true);
  }

  async function handleSave(user) {
    try {
      if (selectedUser) {
        await api.put(`/users/${user.id}`, user);

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === user.id ? user : u)),
        );
      } else {
        const response = await api.post("/users", user);

        setUsers((prevUsers) => [
          ...prevUsers,
          {
            ...user,
            id: response.data.id || Date.now(),
          },
        ]);
      }

      setShowForm(false);
      setSelectedUser(null);
    } catch (err) {
      alert("Something went wrong");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      alert("Unable to delete user.");
    }
  }

  const searchedUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.department.toLowerCase().includes(search.toLowerCase());

    const matchesFilters =
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.department.toLowerCase().includes(filters.department.toLowerCase());

    return matchesSearch && matchesFilters;
  });

  const sortedUsers = [...searchedUsers];

  if (sortOrder === "firstAsc") {
    sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  if (sortOrder === "firstDesc") {
    sortedUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
  }

  if (sortOrder === "emailAsc") {
    sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
  }

  if (sortOrder === "emailDesc") {
    sortedUsers.sort((a, b) => b.email.localeCompare(a.email));
  }

  const indexOfLastUser = currentPage * rowsPerPage;

  const indexOfFirstUser = indexOfLastUser - rowsPerPage;

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  return (
    <div className="container">
      <h1 className="title">User Management System</h1>

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="toolbar">
            <button
              className="add-btn"
              onClick={() => {
                setSelectedUser(null);
                setShowForm(true);
              }}
            >
              ➕ Add User
            </button>

            <SearchBar search={search} setSearch={setSearch} />

            <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />

            <button className="filter-btn" onClick={() => setShowFilter(true)}>
              🔍 Filters
            </button>
          </div>

          <UserTable
            users={currentUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />

          {showForm && (
            <UserForm
              selectedUser={selectedUser}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setSelectedUser(null);
              }}
            />
          )}

          <FilterModal
            show={showFilter}
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilter(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;
