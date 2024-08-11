import React from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: '#64748b',
    activeColor: '#22c55e',
    size: window.innerWidth < 600 ? 20 : 25,
    value: review?.rating || 0, // Add a fallback value to avoid errors
    isHalf: true
  };

  return (
    <div className='bg-neutral rounded-lg pt-3 p-4 mb-2 w-[250px]'>
      <div className='flex gap-2'>
        <img src='https://eu.ui-avatars.com/api/?name=Deepak+Thapa&size=20' />
        <p className='font-bold'>{review.name}</p>
      </div>
      <div className='mx-2'>
        <div className='flex items-center gap-1'>
          <span className='mt-1'>({review.rating})</span>
          <ReactStars {...options} />
        </div>
        <span className='text-xs'>{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
