import firebase from 'firebase/app';

export default {
  state: {},
  mutations: {},
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      console.log(dispatch, commit);
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((e) => {
            console.log(e);
          });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  getters: {},
};
