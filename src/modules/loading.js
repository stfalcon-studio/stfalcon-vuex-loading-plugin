import { IS_LOADING, LOAD_TURNS, PUSH_TURN, REMOVE_TURN } from '../store-constants';

export default {
  state: { [LOAD_TURNS]: [] },

  getters: {
    [IS_LOADING]: state => !!state[LOAD_TURNS].length,
  },

  mutations: {
    [PUSH_TURN](state, actionName) {
      state[LOAD_TURNS] = [...state[LOAD_TURNS], actionName];
    },
    [REMOVE_TURN](state, actionName) {
      // TODO: should remove only one action from turns. Should be refactored.
      state[LOAD_TURNS] = state[LOAD_TURNS].filter(
        (_, idx, arr) => idx !== arr.indexOf(actionName)
      );
    }
  },

  actions: {
    clearAll({ state, commit }) {
      state.loadTurns.forEach(turn => {
        commit(`${turn}/SET_LOADING`, false, { root: true });
        commit('REMOVE_TURN', turn);
      })
    }
  }
};
