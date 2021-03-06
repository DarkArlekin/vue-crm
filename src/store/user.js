import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  state: {
    info: {},
  },
  mutations: {
    setUserInfo(state, info) {
      state.info = info;
    },
    clearUserInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchUserInfo({ dispatch, commit }) {
      const uid = await dispatch('getUid');
      const info = (await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .once('value'))
        .val();
      commit('setUserInfo', info);
    },
    async updateUserBill({ dispatch, commit, getters }, toUpdate) {
      const uid = await dispatch('getUid');
      const updateData = { ...getters.getUserInfo, ...toUpdate };
      return firebase
        .database()
        .ref(`/users/${uid}/info`)
        .update(updateData)
        .then(() => {
          dispatch('fetchUserInfo');
        })
        .catch((e) => {
          commit('authInErr');
          throw e;
        });
    },
    fetchCurrency() {
      return fetch('https://api.exchangeratesapi.io/latest?base=EUR')
        .then((e) => e.json())
        .catch((err) => {
          throw err;
        });
    },
  },
  getters: {
    getUserInfo: (s) => s.info,
  },
};
