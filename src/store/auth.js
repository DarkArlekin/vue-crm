import firebase from 'firebase/app';

export default {
  state: {},
  mutations: {},
  actions: {
    login(context, { email, password }) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    },
    signOut() {
      return firebase
        .auth()
        .signOut();
    },
  },
  getters: {},
};
