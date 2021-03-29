import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggestedProfile';

export default function Suggestions({ userId, following, loggedUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    userId && suggestedProfiles();
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={3} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you:</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map(({ docId, username, userId: profileUserId }) => (
          <SuggestedProfile
            key={docId}
            userDocId={docId}
            username={username}
            profileId={profileUserId}
            userId={userId}
            loggedUserDocId={loggedUserDocId}
          />
        ))}
      </div>
    </div>
  ) : (
    <p>I am sidebar</p>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedUserDocId: PropTypes.string
};
