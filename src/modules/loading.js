export default {
  state: {
    isLoading: false,
  },

  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value;
    }
  }
};
