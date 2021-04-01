import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/user';
import { likePhoto } from '../../services/firebase';

export default function Actions({
  docId,
  totalLikes,
  isPhotoLiked,
  handleFocus
}) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(isPhotoLiked);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setToggleLiked(toggleLiked => !toggleLiked);
    await likePhoto({ docId, toggleLiked, userId });
    setLikes(likesCount => (toggleLiked ? likesCount - 1 : likesCount + 1));
  };

  const handleKeyDown = e => {
    e.key === 'Enter' && handleToggleLiked();
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            onKeyDown={handleKeyDown}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? `fill-red text-red-primary` : `text-black-light`
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            onClick={handleFocus}
            className="w-8 text-black-light select-none cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">{`${likes} like${likes !== 1 ? 's' : ''}`}</p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  isPhotoLiked: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};
