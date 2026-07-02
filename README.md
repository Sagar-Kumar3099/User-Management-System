# User Management System

A responsive React application that performs **CRUD (Create, Read, Update, Delete)** operations using the JSONPlaceholder mock REST API.

This project was developed as part of a frontend assignment to demonstrate React fundamentals, API integration, state management, form validation, filtering, searching, sorting, and pagination.

---

## Features

* View users from API
* Add a new user
* Edit existing user details
* Delete users
* Search users
* Sort users
* Filter users
* Pagination (10, 25, 50, 100 records per page)
* Client-side form validation
* Loading indicator
* Error handling
* Responsive UI
* Modal popup for Add/Edit user

---

## Tech Stack

* React
* JavaScript (ES6+)
* Axios
* CSS3

---

## Project Structure

```text
src/
│
├── components/
│   ├── UserTable.jsx
│   ├── UserForm.jsx
│   ├── SearchBar.jsx
│   ├── SortDropdown.jsx
│   ├── Pagination.jsx
│   ├── Loader.jsx
│   ├── ErrorMessage.jsx
│   └── FilterModal.jsx
│
├── services/
│   └── api.js
│
├── utils/
│   └── validation.js
│
├── styles/
│   ├── App.css
│   ├── table.css
│   └── form.css
│
├── App.jsx
└── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <https://github.com/Sagar-Kumar3099/user-management-system/>
```

Navigate to the project directory:

```bash
cd user-management-system
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## API Used

JSONPlaceholder REST API

Endpoint:

```text
https://jsonplaceholder.typicode.com/users
```

---

## Functionality

### View Users

* Fetches users using GET request.
* Displays ID, First Name, Last Name, Email and Department.

### Add User

* Opens a modal form.
* Validates user input.
* Sends POST request.
* Updates local state.

### Edit User

* Opens pre-filled modal.
* Sends PUT request.
* Updates local state.

### Delete User

* Confirmation dialog before deletion.
* Sends DELETE request.
* Removes user from local state.

### Search

Search users by:

* First Name
* Last Name
* Email
* Department

### Sort

Sort by:

* First Name (Ascending)
* First Name (Descending)
* Email (Ascending)
* Email (Descending)

### Filter

Filter users using:

* First Name
* Last Name
* Email
* Department

### Pagination

Supports:

* 10 records
* 25 records
* 50 records
* 100 records

per page.

---

## Form Validation

The application validates:

* First Name (Required)
* Last Name (Required)
* Email (Required)
* Valid Email Format
* Department (Required)

---

## Error Handling

The application handles:

* Failed API requests
* Form validation errors
* Delete confirmation
* Loading state

---

## Assumptions

* JSONPlaceholder is a mock REST API.
* POST, PUT and DELETE requests return successful responses but do not permanently modify server data.
* The Department field is assigned locally because it is not available in the API response.

---

## Future Improvements

* Toast notifications
* Dark mode
* Server-side pagination
* Debounced search
* Unit testing using Jest and React Testing Library
* Authentication
* Role-based access

---

## Author

**Sagar-Kumar**
