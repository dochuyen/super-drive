import React from 'react';
import classNames from "classnames/bind";
import styles from "./Posts.module.scss";
import Post from './Post';
const cx = classNames.bind(styles);
const Posts = () => {
    return (
        <div className={cx('posts')}>
            <Post imageURL={'https://wallpapers.com/images/featured/g6a4f0e15hkua5oa.jpg'}></Post>
            <Post imageURL={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7YvAHVwiVQS0HIVKeFu0Ptx5BHNOZVXrTdg&usqp=CAU'}></Post>
            <Post imageURL={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCv_fxNt0C8n8zQ8btlJNTXrWynfYmYyMqkA&usqp=CAU'}></Post>
            <Post imageURL={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GJndww4YgWvZLtjx1mKWnBsPzaLVYmkvdQ&usqp=CAU'}></Post>
            <Post imageURL={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpDfuQKS-SQbyx4Nnpx9miRsGpH0IQe0kiWg&usqp=CAU'}></Post>
            <Post imageURL={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ63KtVEeqKz7UbzIGPKrpqAaV0mv0atrd0A&usqp=CAU'}></Post>
        </div>
    );
};

export default Posts;