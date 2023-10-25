import React, { useState, useEffect } from "react";
import styles from "./UserAdmin.module.scss";
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
}) {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const currentUsers = users.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleAddUser = (newUser) => {
    // Gọi API để thêm người dùng mới
    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/user/register`, newUser)
      .then((response) => {
        // Cập nhật danh sách người dùng sau khi thêm thành công
        setUsers((prevUsers) => [...prevUsers, response.data.data]);
        setIsAddModalOpen(false); // Đóng modal sau khi thêm thành công
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/user`)
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, []);

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
          handleAddUser={handleAddUser}
        />
      )}
      <div className={cx("modal-filter")}>
        <p>Tổng số mục: {users.length}</p>
        <div className={cx("Filter")}></div>
      </div>
      <div className={cx("Modal")}>
        <table className={cx("full-table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
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
                    {isEditModalOpen && (
                      <EditUser
                        isModalOpen={isEditModalOpen}
                        closeModal={() => setIsEditModalOpen(false)}
                      />
                    )}
                  </Link>
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
