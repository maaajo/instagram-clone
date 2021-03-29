import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  updateUserFollowers,
  updateLoggedInUserFollowing
} from '../../services/firebase';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
  loggedUserDocId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedUserDocId, profileId, false);
    await updateUserFollowers(userDocId, userId, false);
  }

  return (
    !followed && (
      <div className="flex flex-row items-center align-items justify-between">
        <div className="flex items-center justify-between">
          <img
            src={`../images/avatars/${username}.jpg`}
            className="rounded-full w-8 flex mr-3"
            alt=""
          />
          <Link className="font-bold text-sm" to={`/p/${username}`}>
            {username}
          </Link>
        </div>
        <button
          type="button"
          className="text-xs font-bold text-blue-medium"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    )
  );
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedUserDocId: PropTypes.string.isRequired
};
