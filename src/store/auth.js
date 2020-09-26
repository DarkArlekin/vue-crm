import firebase from 'firebase/app';

export default {
  state: {
    authErr: false,
  },
  mutations: {
    authInErr(state, err) {
      state.authErr = err;
    },
    clearAuthErr(state) {
      state.authErr = false;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
          commit('authInErr', err);
          throw err;
        });
    },
    async register({ dispatch, commit }, { email, password, name }) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          email,
          password,
        )
        .then(() => dispatch('getUid'))
        .then((uid) => {
          dispatch('setUserState', {
            uid,
            name,
          });
        })
        .catch((err) => {
          commit('authInErr', err);
          throw err;
        });
    },
    setUserState(ctx, { uid, name }) {
      firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          bill: 10000,
          name,
        })
        .catch((err) => {
          throw err;
        });
    },
    getUid() {
      return firebase.auth().currentUser?.uid ?? null;
    },
    signOut({ commit }) {
      commit('clearUserInfo');
      return firebase
        .auth()
        .signOut();
    },
  },
  getters: {
    error: (s) => s.authErr,
  },
};
