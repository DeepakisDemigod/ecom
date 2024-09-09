import React from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({ review }) => {
  const options = {
    className: 'stars',
    edit: false,
    color: '#64748b',
    activeColor: '#22c55e',
    size: window.innerWidth < 600 ? 20 : 25,
    value: review?.rating || 0, // Add a fallback value to avoid errors
    isHalf: true
  };

  return (
    <div className='bg-neutral   pt-3 p-4 mb-2 w-[300px]'>
      <div className='flex gap-2 mx-3'>
        <img src='https://eu.ui-avatars.com/api/?name=john+doe&size=20' />
        <p className=''>{review.name}</p>
      </div>
      <div className='mx-4'>
        <div className='flex items-center gap-1'>
          <ReactStars {...options} /> 
          <span className='mt-1 text-xs text-zinc-400'>• {review.rating}</span>
        </div>
        <span className='text-xs '>{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
