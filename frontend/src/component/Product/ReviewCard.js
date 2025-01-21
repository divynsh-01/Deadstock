import React from 'react'
import profilePng from "../../images/Profile.png"
// import ReactStars from "react-rating-stars-component"
import { Rating } from '@mui/material';

const ReviewCard = ({review}) => {
    const options = {
      precision: 0.5,
      readOnly: true,
      value: review.rating,
      };

  return (
    <div className='reviewCard'>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}/>
      <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
