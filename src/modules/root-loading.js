import { IS_LOADING } from '../store-constants';

export default {
  getters: {
    [IS_LOADING](state, getters, globalState, globalGetters) {
      return Object.keys(globalGetters)
        .filter(getterName => getterName !== IS_LOADING && getterName.includes(IS_LOADING))
        .map(n => globalGetters[n])
        .some(Boolean);
    }
  }
}