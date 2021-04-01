import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/user';
import { addComment } from '../../services/firebase';

export default function AddComment({
  comments,
  setComments,
  commentInput,
  docId
}) {
  const [comment, setComment] = useState('');
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = e => {
    e.preventDefault();

    if (comment.length >= 1) {
      setComments([{ displayName, comment }, ...comments]);
      setComment('');

      addComment({ docId, comment: { displayName, comment } });
    }

    return null;
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          value={comment}
          name="add-comment"
          placeholder="Add a comment"
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        ></input>
        <button
          className={`text-sm font-bold text-blue-medium ${comment.length < 1 &&
            'opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
  docId: PropTypes.string.isRequired
};
