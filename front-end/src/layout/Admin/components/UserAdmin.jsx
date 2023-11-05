import React, { useState, useEffect } from "react";
import styles from "./UserAdmin.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";

import { EditUser, UserAddModal } from "./UserModal.jsx";

const cx = classNames.bind(styles);

function UserAdmin({
  currentPage,
  itemsPerPage,
  indexOfFirst,
  indexOfLast,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
}) {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleDeleteUser = (userId) => {
    axios
      .delete(`${process.env.REACT_APP_API_KEY}/api/user/${userId}`)
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/user`)
      .then((response) => {
        const allUsers = response.data.data;
        const usersWithUserRole = allUsers.filter(
          (user) => user.role === "user"
        );
        setUsers(usersWithUserRole);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);
  const handleAddUser = (newUser) => {
    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/user/register`, newUser)
      .then((response) => {
        setUsers((prevUsers) => [...prevUsers, response.data.data]);
        setIsAddModalOpen(false);
      })

      .catch((error) => {
        console.error("Error adding user: ", error);
      });
  };

  return (
    <article>
      <div className={cx("modal-title")}>
        <h2>Quản lý người dùng</h2>
        <button onClick={() => setIsAddModalOpen(true)}>+</button>
      </div>
      {isAddModalOpen && (
        <UserAddModal
          isModalOpen={isAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          setUsers={setUsers}
          handleAddUser={handleAddUser}
        />
      )}
      <div className={cx("modal-filter")}>
        {filteredUsers.length === 0 ? (
          <>
            <p>Tổng số mục: {filteredUsers.length}</p>
            <p>Không có người dùng...</p>
          </>
        ) : (
          <p>Tổng số mục: {filteredUsers.length}</p>
        )}

        <input
          type="text"
          value={searchTerm}
          placeholder="Tìm kiếm người dùng..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={cx("Modal")}>
        <table className={cx("full-table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link to={`/user/${user._id}`}>
                    <button
                      className={cx("btn-action")}
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Sửa
                    </button>
                  </Link>
                  {isEditModalOpen && (
                    <EditUser
                      isModalOpen={isEditModalOpen}
                      closeModal={() => setIsEditModalOpen(false)}
                    />
                  )}
                  <button
                    className={cx("btn-action")}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={cx("pageNumber")}>
          <h5>Trang</h5>
          {pageNumbers.map((pageNumber) => (
            <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export default UserAdmin;
