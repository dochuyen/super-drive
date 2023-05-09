import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiUser } from "react-icons/ci";
import { BiTimeFive } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
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

  const fetchComment = () => {
    axios
      .get(`http://localhost:8080/api/comments/get`)
      .then((res) => {
        const commentData = res.data;
        setComments(commentData.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const username = useSelector((state) => state.username);

  const token = JSON.parse(localStorage.getItem("token"));

  const postHandle = () => {
    const newFullComment = {
      username: username,

      comment: newComment,
    };

    fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newFullComment),
    });

    setNewComment("");
  };

 

  return (
    <>
      {/* <div className={cx("toolbar")}>
        <Container>
          <h3 className={cx("toolbar-title")}>Blog</h3>
          <div className={cx("directional")} >
            Home <AiOutlineRight className={cx("icon-tool")} />
            <span>Blog</span>
          </div>
          <div className={cx("blogSearch")}>
            <form>
              <input type="text" placeholder="Tìm kiếm blog..."></input>
              <button className={cx("searchButton")}>Tìm kiếm</button>
            </form>
          </div>
          <BlogHeader></BlogHeader>
        </Container>
      </div> */}
      <div>
        <BlogHeader></BlogHeader>
      </div>

      <div className={cx('blogTitle')}>
        <span>Our Blog</span>
      </div>
      
      <div className={cx('home')}>
      <Posts></Posts>
        <Sidebar></Sidebar>
        
      </div>
      <Container>
      
        {/* <Row>
          <Col md={8}>
            <div className={cx("blog")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
                alt=""
                width="100%"
              />{" "}
              <div className={cx("blog-title")}>
                <h3>
                  Dolorum optio tempore voluptas dignissimos cumque fuga qui
                  quibusdam quia
                </h3>
                <div className={cx("blog-post")}>
                  <span>
                    <CiUser />
                    <h6>Đàn Kiều</h6>
                  </span>
                  <span>
                    <BiTimeFive />
                    <h6>Jan 17, 2020</h6>
                  </span>
                  <span>
                    <FaRegCommentDots />
                    <h6> 12 Comment</h6>
                  </span>
                </div>
                <p className={cx("blog-text")}>
                  Similique neque nam consequuntur ad non maxime aliquam quas.
                  Quibusdam animi praesentium. Aliquam et laboriosam eius aut
                  nostrum quidem aliquid dicta. Et eveniet enim. Qui velit est
                  ea dolorem doloremque deleniti aperiam unde soluta. Est cum et
                  quod quos aut ut et sit sunt. Voluptate porro consequatur
                  assumenda perferendis dolore.
                </p>
                <button>Read More</button>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={cx("blog-nav")}>
              <h3>Recent Posts</h3>
              <div className={cx("nav-title")}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
                  alt=""
                  width="100px"
                  height="60px"
                />
                <p>
                  Nihil blanditiis at in nihil autem Similique neque nam
                  consequuntur ad non maxime aliquam quas. Quibusdam animi
                  praesentium. Aliquam et laboriosam eius aut nostrum quidem
                  aliquid dicta. Et eveniet enim. Qui velit est ea dolorem
                  doloremque deleniti aperiam unde soluta. Est cum et quod quos
                  aut ut et sit sunt. Voluptate porro consequatur assumenda
                  perferendis dolore.
                </p>
              </div>
              <div className={cx("nav-title")}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
                  alt=""
                  width="100px"
                  height="60px"
                />
                <p>
                  Nihil blanditiis at in nihil autem Similique neque nam
                  consequuntur ad non maxime aliquam quas. Quibusdam animi
                  praesentium. Aliquam et laboriosam eius aut nostrum quidem
                  aliquid dicta. Et eveniet enim. Qui velit est ea dolorem
                  doloremque deleniti aperiam unde soluta. Est cum et quod quos
                  aut ut et sit sunt. Voluptate porro consequatur assumenda
                  perferendis dolore.
                </p>
              </div>
              <div className={cx("nav-title")}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFwttmJ8hKA9m__MNyYn7WghUocb2Gu9Uoow&usqp=CAU"
                  alt=""
                  width="100px"
                  height="60px"
                />
                <p>
                  Nihil blanditiis at in nihil autem Similique neque nam
                  consequuntur ad non maxime aliquam quas. Quibusdam animi
                  praesentium. Aliquam et laboriosam eius aut nostrum quidem
                  aliquid dicta. Et eveniet enim. Qui velit est ea dolorem
                  doloremque deleniti aperiam unde soluta. Est cum et quod quos
                  aut ut et sit sunt. Voluptate porro consequatur assumenda
                  perferendis dolore.
                </p>
              </div>
            </div>
          </Col>
        </Row> */}

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
