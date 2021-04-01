import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        isPhotoLiked={content.isUserLikingPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        displayName: PropTypes.string
      })
    ),
    dateCreated: PropTypes.number,
    docId: PropTypes.string,
    imageSrc: PropTypes.string,
    isUserLikingPhoto: PropTypes.bool,
    likes: PropTypes.array,
    photoId: PropTypes.number,
    userId: PropTypes.string,
    userLongitude: PropTypes.string,
    userLatitude: PropTypes.string,
    username: PropTypes.string
  })
};
