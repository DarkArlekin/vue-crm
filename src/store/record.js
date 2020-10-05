import firebase from 'firebase/app';

export default {
  actions: {
    async fetchRecords({ commit, dispatch }) {
      const uid = await dispatch('getUid');
      const records = (await firebase
        .database()
        .ref(`/users/${uid}/records`)
        .once('value')
        .catch((e) => {
          commit('authInErr');
          throw e;
        }))
        .val() ?? {};
      return Object.keys(records)
        .map((key) => ({
          recId: key,
          ...records[key],
        }));
    },
    async createNewRecord({ commit, dispatch }, record) {
      const uid = await dispatch('getUid');
      return firebase
        .database()
        .ref(`/users/${uid}/records`)
        .push(record)
        .catch((e) => {
          commit('authInErr');
          throw e;
        });
    },
  },
};
