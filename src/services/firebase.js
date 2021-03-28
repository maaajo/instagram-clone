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
