export default {
  namespaced: true,

  state: { turns: [] },

  getters: {
    isLoading: state => !!state.turns.length,
    isLoadingModules: ({ turns }) => modules => {
      if (!modules) {
        throw Error("[modules] is required argument");
      }

      return turns.some(module => modules.includes(module));
    }
  },

  mutations: {
    PUSH_TURN(state, moduleName) {
      state.turns = [...state.turns, moduleName];
    },
    REMOVE_TURN(state, moduleName) {
      state.turns = state.turns.filter(
        (_, idx, arr) => idx !== arr.indexOf(moduleName)
      );
    }
  }
};
