import React, { useEffect, useState, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import BlogHeader from "./BlogHeader";
import Posts from "./Posts";
import Sidebar from "./Sidebar";
const cx = classNames.bind(styles);

const Blog = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const username = useSelector((state) => state.username);
  const token = localStorage.getItem("token");
  const fetchComment = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/comments/get`)
      .then((res) => {
        const commentData = res.data;
        setComments(commentData.data.reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const postHandle = () => {
    const newFullComment = {
      username: username,
      comment: newComment,
    };

    fetch(`${process.env.REACT_APP_API_KEY}/api/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newFullComment),
    }).then(() => {
      fetchComment();
    });

    setNewComment("");
  };

  return (
    <>
      <div>
        <BlogHeader></BlogHeader>
      </div>

      <div className={cx("blogTitle")}>
        <span>Our Blog</span>
      </div>

      <div className={cx("home")}>
        <Posts></Posts>
        <Sidebar></Sidebar>
      </div>
      <Container>
        <br />
        <br />
        <Row className={cx("comment")}>
          <h1>Bình Luận</h1>
          <div className={cx("comment-form")}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
              alt=""
              width="50px"
              height="50px"
            />
            <input
              type="text"
              value={newComment}
              placeholder="Viết bình luận"
              onChange={(e) => {
                {
                  setNewComment(e.target.value);
                }
              }}
            />
            <div className={cx("commentBtnHolder")}>
              <button
                className={cx("commentBtn")}
                onClick={(e) => postHandle(e)}
              >
                Bình luận
              </button>
            </div>
          </div>
          <ul className={cx("list-comment")}>
            {comments.map((comment) => {
              return (
                <li key={comment._id} className={cx("comment-box")}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
                    alt=""
                    width="50px"
                    height="50px"
                  />
                  <div className={cx("comment-info")}>
                    <h5 style={{ marginTop: "18px" }}>{comment.username}</h5>
                    <p>{comment.comment}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Row>
      </Container>
    </>
  );
};
export default Blog;
