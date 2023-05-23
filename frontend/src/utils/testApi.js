/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-promise-reject-errors */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const checkResponse = ({ user }) => {
  if (user.uid) {
    console.log('OK');
    return user;
  }
  //   return Promise.reject(`Bug detected! ${res.status}: ${res.statusText}`);
  return Promise.reject(`Bug detected!`);
};

export const authorize = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password).then(checkResponse);
};

// const authByToken = (token) => {
//     return fetch(URL_CONFIG.url + "signin", {
//       method: "GET",
//       headers: {
//         ...URL_CONFIG.headers,
//       Authorization: `Bearer ${token}`},
//     })
//       .then(checkResponse);
//   }

export const register = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then(checkResponse);
};

