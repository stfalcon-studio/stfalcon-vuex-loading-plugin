import { cutAction } from "./utils";

const loadingModule = {
  state: {
    isLoading: false
  },
  mutations: {
    SET_LOADING(state, value) {
      state.isLoading = value;
    }
  }
};

const includeLoadingToAllModules = store => {
  const namespacedModules = Object.keys(store._modulesNamespaceMap);
  store.registerModule("loading", loadingModule);

  namespacedModules.forEach(moduleName => {
    const modules = moduleName.split("/").slice(0, -1);
    store.registerModule([...modules, "loading"], loadingModule);
  });
};

export default store => {
  includeLoadingToAllModules(store);

  store.subscribeAction({
    before: action => {
      const moduleName = cutAction(action.type);
      store.commit(`${moduleName}/SET_LOADING`, true);
    },
    after: action => {
      const moduleName = cutAction(action.type);
      store.commit(`${moduleName}/SET_LOADING`, false);
    }
  });
};
