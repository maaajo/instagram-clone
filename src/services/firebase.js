import { firebase, FieldValue } from '../lib/firebase';
import * as CONSTANTS from '../constants/constants';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map(user => {
    return user.data().username.length > 0;
  });
}

export async function getUserByUserId(uid) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', uid)
    .get();

  const user = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
}

export async function getSuggestedProfiles(uid, following) {
  const allUsersLimited = await firebase
    .firestore()
    .collection('users')
    .where('userId', '!=', uid)
    .limit(CONSTANTS.MAX_USER_SUGGESTIONS)
    .get();

  return allUsersLimited.docs
    .map(doc => ({
      ...doc.data(),
      docId: doc.id
    }))
    .filter(profile => !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
  docId,
  profileId,
  isFollowing
) {
  await firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateUserFollowers(docId, uidToFollow, isFollowing) {
  await firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(uidToFollow)
        : FieldValue.arrayUnion(uidToFollow)
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map(doc => ({
    ...doc.data(),
    docId: doc.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async photo => {
      let isUserLikingPhoto = false;
      if (photo.likes.includes(userId)) {
        isUserLikingPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { ...photo, username, isUserLikingPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function likePhoto({ docId, toggleLiked, userId }) {
  await firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId)
    });
}

export function addComment({ docId, comment }) {
  return firebase
    .firestore()
    .collection('photos')
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion({ ...comment })
    });
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getUserPhotos(userId) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get();

  return result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername)
    .where('following', 'array-contains', userId)
    .get();

  const [response = {}] = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow({
  isFollowingUser,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
}) {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingUser
  );
  await updateUserFollowers(profileDocId, followingUserId, isFollowingUser);
}
