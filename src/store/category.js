import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      const uid = await dispatch('getUid');
      const category = await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .push({
          title,
          limit,
        })
        .catch((e) => {
          commit('authInErr');
          throw e;
        });
      return {
        title,
        limit,
        id: category.key,
      };
    },
    async fetchCategories({ dispatch, commit }) {
      const uid = await dispatch('getUid');
      const categories = (await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .once('value')
        .catch((e) => {
          commit('authInErr');
          throw e;
        }))
        .val() ?? {};
      return Object.keys(categories)
        .map((key) => ({
          ...categories[key],
          id: key,
        }));
    },
  },
};
