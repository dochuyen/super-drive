import React from 'react';
import classNames from "classnames/bind";
import styles from "./Post.module.scss";
const cx = classNames.bind(styles);
const Post = ({imageURL}) => {
    return (
        <div className={cx('post')}>
            <img className={cx('postImg')} src={imageURL}></img>
            <div className={cx('postInfo')}>
                <div className={cx('postCats')}>
                    <span className={cx('postCat')}>Car</span>
                    <span className={cx('postCat')}>Trend</span>
                </div>
                <span  className={cx('postTitle')}>Best car for Loser 2023</span>
                <hr style={{margin:'0px'}}></hr>
                <span  className={cx('postDate')}>1 hour ago</span>
            </div>
            <p className={cx('postDesc')}>There are many great cars available in 2023, and the best one for you will depend on your specific needs and preferences. Some factors to consider when choosing a car include your budget, lifestyle, driving habits, and personal style. If you're looking for a reliable and affordable car, some options to consider are the Toyota Corolla, Honda Civic, and Mazda3. These cars are known for their longevity, fuel efficiency, and safety features.

If you want something more luxurious and high-performance, you might consider a BMW 3 Series, Mercedes-Benz C-Class, or Audi A4. These cars offer advanced technology, refined interiors, and powerful engines.

If you need a family-friendly car, some good choices are the Honda Odyssey, Toyota Sienna, and Kia Sedona. These minivans offer spacious interiors, advanced safety features, and ample cargo space.

Ultimately, the best car for you will depend on your individual needs and preferences, so it's important to do your research, take some test drives, and consult with a knowledgeable salesperson before making a decision.
</p>

        </div>
    );
};

export default Post;