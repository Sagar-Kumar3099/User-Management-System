import { useEffect, useState } from "react";
import { validateForm } from "../utils/validation";
import "../styles/form.css";

function UserForm({ selectedUser, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }

    setErrors({});
  }, [selectedUser]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formData);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" type="button" onClick={onCancel}>
          ×
        </button>

        <h2>{selectedUser ? "✏️ Edit User" : "➕ Add User"}</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />

            <small>{errors.firstName}</small>
          </div>

          <div className="input-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />

            <small>{errors.lastName}</small>
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />

            <small>{errors.email}</small>
          </div>

          <div className="input-group">
            <label>Department</label>

            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
            />

            <small>{errors.department}</small>
          </div>

          <div className="button-group">
            <button type="submit">
              {selectedUser ? "Update User" : "Add User"}
            </button>

            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
